let express=require('express');
let router=express.Router();//it si mini express apllication and import to over main file 
let model=require('../models/productschema')

let protection=require("../contoller/auth");
router.get('/',async(req,res,next)=>{//get method it is used to retrive the data from the database
 
    
   try {//it will check if it running without any error if true it runs the try method
    let products = await model.find({},{name:1,brand:1,price:1,rating:1,stock:1,sizes:1});  //find method it is used to check wheather it is present in the database or not
    res.json({
      status: 200,//status 200 it is ok
      msg: "Products are accessed from the database",
      data: products
    });
  } catch (err) {//if any error is raised then it will go to catch and exicute the part
    res.status(500).json({ status: 500, msg: err.message });
  }
});
router.get('/count',async(req,res,next)=>{
  try{
    let cout=await model.countDocuments({brand:"Skechers"})
     res.status(200).json({ cout });
    console.log(cout);
  }
  catch(err){
    res.status(500).json({ msg: err.message });
    console.log("there is no macthing items in database")
  }
  
  
})
router.get('/estimate',async(req,res,next)=>{
  try{
    let cout=await model.estimatedDocumentCount()
     res.status(200).json({ cout });
    console.log(cout);
  }
  catch(err){
    res.status(500).json({ msg: err.message });
    console.log("there is no macthing items in database")
  }
  
  
})
router.delete('/:_id',protection, async (req, res) => {//delete method it check the element is matched with the document it will delete the  document then mongodb return the acknowledgement and deletecount
  try {
    const result = await model.deleteOne({ _id: req.params._id });
    if (!result.deletedCount) {//mongodb return some content when the value matched or unmacthed acknowledgement and deletecount if it match it giev 1 or else it give 0
      return res.status(404).json({ msg: "Not found" });
    }
    res.status(200).json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
router.delete('/:_id',protection, async (req, res) => {//delete method it check the element is matched with the document it will delete the  document then mongodb return the acknowledgement and deletecount
  try {
    const result = await model.findByIdAndDelete( req.params._id );
    console.log(result)
    if (!result) {//i will return jull if not founded otherwise it give the document of deleted one
      return res.status(404).json({ msg: "Not found" });
    }
    res.status(200).json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// router.patch('/:_id',async(req,res,next)=>{//patch method it is used to update a certain element from the document it match the element if it match the $set change the value by the body
//      let object=await model.updateOne({_id:req.params._id},{$set:{name:req.body.name,brand:req.body.brand,price:req.body.price,rating:req.body.rating}});
//      console.log(req.body);
     
//      if(object.matchedCount===0){//same like delete it will giev three values acknowledgement and matchedcount and modified count if it match it will return the no og matchs and no of modifies
//           res.status(404).json({msg:"not macthe with the id"})
//      }
//      res.json({status:200,msg:"succesfully upadted"})
// })
router.patch('/:_id',async(req,res,next)=>{//patch method it is used to update a certain element from the document it match the element if it match the $set change the value by the body
     let object=await model.findByIdAndUpdate(req.params._id,{$set:{name:req.body.name,brand:req.body.brand,price:req.body.price,rating:req.body.rating}},{new:true,runValidators:true});
     console.log(object);
     
     if(!object){//same like delete it will giev three values acknowledgement and matchedcount and modified count if it match it will return the no og matchs and no of modifies
          res.status(404).json({msg:"not macthe with the id"})
     }
     res.json({status:200,msg:"succesfully upadted"})
})
module.exports=router;