const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const authRouter = require('./routes/auth')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log("DB Connect")})
.catch((err) => {
    console.log(err)
})

app.use(express.json())
// app.use("/api/users", userRoute) // takes to user router localhost:5000/api/user/usertest
app.use("/auth", authRouter)

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server running")
})