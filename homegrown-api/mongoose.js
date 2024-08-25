const mongoose = require("mongoose")
mongoose.set('toJSON', { virtuals: true })
mongoose.set("strictQuery", false)

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

console.log("Attempting MongoDB connection.")
try {
    mongoose.connect(`mongodb://127.0.0.1:27017/homegrown_db`, options, err => {
        if (err) console.log("error:", err)
        console.log("MongoDB connection successful.")
    })
} catch (err) {
    console.log(err.message)
    console.log("MongoDB connection failed.")
}