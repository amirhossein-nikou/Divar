const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("mongo db Connected");
}).catch((err)=>{
    console.log(err);
})