let mongoose=require('mongoose');//odm object data modeling it is used in the mongodb and node 
let schema= new mongoose.Schema({//schema it is set rule that data should follow before adding in the database document
    name:String,
    brand:String,
    price:Number,
    rating:Number,
    image:String,
    sizes:{type:[Number],
        default:[]
    },
    stock:Number
})
let model =mongoose.model("bhava",schema,"shoes");//model is like a class it will wrap the schema and the database name

module.exports=model;