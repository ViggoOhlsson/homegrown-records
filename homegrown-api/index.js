require("./onInitMessage")

require("dotenv").config()
require("./mongoose.js")
const express = require("express")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const fs = require("fs")
const { decryptToken, encryptToken } = require("./utils")
const jwt = require("jsonwebtoken")
const port = 80


const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

//MODELS 
const UserModel = require("./models/UserModel")
const StoreItemModel = require("./models/StoreItemModel")

//CORS
app.use(function (req, res, next) {

    const origins = ['http://localhost:8080', 'http://192.168.10.228:8080', 'https://darz.one']
    const origin = req.headers.origin
    console.log("origin:", origin)
    if (origins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(async (req, res, next) => {
    let { authToken } = req.cookies
    res.locals.user = async () => undefined
    if (!authToken) {
        next()
        return
    }
    authToken = decryptToken(authToken)
    if (authToken && jwt.verify(authToken, process.env.JWT_SECRET)) {
        // console.log("authenticated!")
        const data = jwt.decode(authToken, process.env.JWT_SECRET)
        res.locals.user = async () => await UserModel.findOne({ _id: data._id })
    }
    next()
})

app.get("/amog", async (req, res) => {
    res.send("amognos")
})

//Integrate Routes
fs.readdir("./routes", (err, files) => {
    if (err) return console.error(err)
    files = files.filter(file => file.endsWith(".js"))
    files.forEach(f => {
        let route = f.split(".")[0]
        let router = require(`./routes/${route}`)
        app.use(`/${route}`, router)
    })
})

app.listen(port, () => {
})