const mongoose = require("mongoose")
mongoose.set('toJSON', { virtuals: true })
mongoose.set("strictQuery", false)

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

console.log("Attempting MongoDB connection.")
try {
    mongoose.connect(`mongodb+srv://darz_admin:oggoboggo@darz-cluster.rlcjl9k.mongodb.net/homegrown_db?retryWrites=true&w=majority`, options, err => {
        if (err) console.log("error:", err)
        console.log("MongoDB connection successful.")
    })
} catch (err) {
    console.log(err.message)
    console.log("MongoDB connection failed.")
}