let mongoose = require('mongoose');
// require('dotenv').config({path:'../.env'});


let url = process.env.URLDATABASE//dotenv it store environment variable where we can acces by the process.env.value
let myfunction = async() => {
    try{
     await mongoose.connect(url);//connecting to database we are using an connect it is asynchoronous function 
     console.log("successfully connected to the database")
     
    }
    catch(err){
        console.log("something is went wrong",err.message)
        process.exit(1);//if the connection is wrong teh connect try connect with database repeatly if it like it crashe the database so then the process.exict will is used to exit it
    }
}
module.exports=myfunction