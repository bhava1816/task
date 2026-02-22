let mongoose=require('mongoose');//odm object data modeling it is used in the mongodb and node 
let schema= new mongoose.Schema({//schema it is set rule that data should follow before adding in the database document
   firstName :{type:String,required:true},
   lastName:{type:String,required:true},
   email:{type:String,required:true,unique:true,match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
   password:{type:String,required:true},
   token:{type:String}
    
})
let model =mongoose.model("bhavas",schema,"task");//model is like a class it will wrap the schema and the database name

module.exports=model;