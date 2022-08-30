const router = require("express").Router();
const User = require("../models/User.model");
const dotenv = require("dotenv")
const CryptoJS = require("crypto-js")

dotenv.config()

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PWD_SECRET).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json("No user present!")
        const hashedPwd = CryptoJS.AES.decrypt(
            user.password, process.env.PWD_SECRET
        )
        const Ogpassword = hashedPwd.toString(CryptoJS.enc.Utf8);

        Ogpassword != req.body.password && res.status(401).json("Wrong Password!")

        const {password, ...others} = user._doc;

        res.status(200).json(others)

    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router