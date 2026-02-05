let express=require('express');
let router=express.Router();//it si mini express apllication and import to over main file 
let model=require('../models/userschema')
let bcrypt=require('bcrypt');
let jwt=require('jsonwebtoken');


let accesstoken=(user)=>{
 return jwt.sign(user,process.env.KEY,{expiresIn:"15m"})
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
      password: hashedPassword
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

 
router.post("/login",async(req,res)=>{
  
  const{email,password}=req.body;
  try{
    let modeled= await model.findOne({email:email});
    let token=accesstoken({email:modeled.email,_id:modeled._id});
    console.log(token);
    let data={
      firstName:modeled.firstName,
      lastName:modeled.lastName,
      token:token
    }
    let hassedpassword=await bcrypt.compare(password,modeled.password)
       if(!hassedpassword){
        return res.json({status:404,msg:"auth failed"})
       }
       else{
        return res.json({status:200 ,msg:"login successfully", data:data})
       }
}
  catch(err){
    res.json({msg:"invalid email"})
  }
  
})

module.exports=router;