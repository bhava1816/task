const express = require('express');//express is a node.js framework is used to craete an rest apis
const morgan=require('morgan');//it is a middleware where the give result speed the status code and time for exicuting the code 
const products=require('./api/routers/product')
const users=require('./api/routers/user')
const app = express();//create an express application 
//we can write all rest api in app.js and import into over main file server .js
app.use(morgan('dev'))
app.use(express.json());//it is an middleware it recieve the all json data from the client and give to over backend server 
app.use('/products',products);//app.use is an middleware where it will use 
app.use('/user',users);
app.use((req,res,next)=>{//middleware it is between the req and res we are using next when invoke next() then only it goes to next part other wise it will stop there
    const error=new Error("not founded")
    error.status=404 || 500
    next(error)
})
app.use((error,req,res,next)=>{//global error handling it is used if any error rasie it give the message why should happen are give predefined message
    res.json({msg:error.message,status:error.status});
})


module.exports = app;//it is used to export the code to another one and we can tre use it es module it work like an synchoronus way
