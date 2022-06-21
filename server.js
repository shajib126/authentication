const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const app = express()
dotenv.config()
//
app.use(express.json())
app.use('/user',userRoutes)




//server
const port = process.env.PORT || 4000
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log(`DB Connected ${mongoose.connection.host}`);
}).then(()=>{
    app.listen(port,()=>console.log(`server running at port ${port}`))
}).catch((err)=>{
    console.log(err);
})
