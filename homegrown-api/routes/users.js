const express = require("express")
const router = express.Router()
const UserModel = require("../models/UserModel")
const { hashPassword, verifyPassword, encryptToken } = require("../utils")
const jwt = require("jsonwebtoken")

router.post("/register", async (req,res) => {
    const {username, email, password, confirmPassword, firstname, lastname,} = req.body
    
    const existingUser = await UserModel.findOne({$or: [{email, username}]})
    
    if (existingUser) {res.send({message: "User with that email or username already exists"}); return}
    if (password !== confirmPassword) {res.send({message: "Passwords do not match."}); return}

    const newUser = new UserModel({
        username,
        email,
        password: hashPassword(password),
        firstname,
        lastname,
    })

    try {
        await newUser.createWishlist()
        await newUser.save()

        const user = await UserModel.findOne({_id: newUser._id}, {})
        res.send({
            message: `Successfully created user '${user.username}'`,
            content: user
        })
    } catch (err) {
        res.send({
            message: 'Could not fetch user.'
        })
    }
})

router.post("/login", async (req,res) => {
    let {username, password} = req.body
    console.log("logging in", username, password)
    let user = await UserModel.findOne({email: username}).select('+password')

    if (!user) user = await UserModel.findOne({username: username}).select('+password')
    if (!user) {res.send({message: "username, email or password is incorrect."}); return}

    if(user && verifyPassword(password, user.password)) {
        const authToken = encryptToken(jwt.sign({_id: user._id}, process.env.JWT_SECRET))
        console.log("successfully logging in")
        res.cookie("authToken", authToken, {
            sameSite: "lax",
            secure: false
        })
        res.send({
            message: `Successfully logged in as ${user.username} (${user.fullname})`,
            content: {
                _id: user._id
            },
            authToken
        })
    } else {
        res.send({
            message: `Login failed`
        })
    }
})

router.get("/logout", async (req,res) => {
    try {
        res.clearCookie("authToken")
        res.send({
            message: "Successfully logged out",
            content: true
        })
    } catch (err) {
        res.send({
            message: "Could not log out.",
            content: false
        })
    }


})

router.post("/validate", async (req,res) => {
    const user = await res.locals.user()

    if (!user) {
        res.send({
            message: "Could not validate user.",
            content: undefined
        })
    } else {
        res.send({
            message: `Validated user '${user.username}'`,
            content: user
        })
    }
})


module.exports = router