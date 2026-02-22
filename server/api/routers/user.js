let express=require('express');
let router=express.Router();//it si mini express apllication and import to over main file 
let model=require('../models/userschema')
let bcrypt=require('bcrypt');
let jwt=require('jsonwebtoken');

let accesstoken=(user)=>{
 return jwt.sign(user,process.env.KEY,{expiresIn:"15m"})
}
let refreshtoken=(user)=>{
 return jwt.sign(user,process.env.KEY,{expiresIn:"7d"})
}
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const exists = await model.findOne({ email });
    if (exists) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new model({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      token:null
    });

    await user.save();

    res.status(201).json({
      msg: "Signup successful",
      data: {
        id: user._id,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/load',async(req,res)=>{
  console.log(req.body)
  let token=req.body.token
  if(!token){
    return res.status(404).json({msg:"tokenexpired"})
  }
  else{
    try{
  let decode= jwt.verify(token,process.env.KEY);
  let modeled= await model.findOne({email:decode.email});
  if(!modeled){
    return res.status(403).json({msg:"not a valid token email"})
  }
  else{
    let data={
      firstName:modeled.firstName,
      lastName:modeled.lastName,
      token:token
    }
    res.json({status:200,msg:"validtoken",data:data})
  }
  }
  catch(err){
    res.json("not a valid token")
  }
  }
  
 
})
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await model.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    
    const accessToken = accesstoken({ email: user.email, _id: user._id });
    const refreshTokenValue = refreshtoken({ email: user.email });
    res.cookie("refreshtoken",refreshTokenValue,{
      httpOnly:true,
      secure:false,
      sameSite:"strict",
      maxAge:7*24*60*60*1000
    })

   
    user.token = refreshTokenValue;
    await user.save();

    return res.status(200).json({
      msg: "Login successfully",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        token: accessToken,
      },
    });

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports=router;