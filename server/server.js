require('dotenv').config();//to import the dotenv extension to over project
const connectdb=require('./database/db')
const app = require('./app');
//express mongoose nodemon dotenv 

const port = process.env.PORT || 3000;

connectdb();//function invoking to run the db.js 
//nodemon is used to auto upadting the values
app.listen(port, () => {//by listen trhe backend will wacth us by an port number
  console.log(`Server running on port ${port}`);
});
