const { model, Schema, Types } = require("mongoose")
const {types, categories} = require("./enums")


const StoreItemSchema = new Schema({
    title: {type: String, required: true, unique: true},
    costUSD: {type: Number, required: true, min: 0},
    thumbnail: {type: String, required: true},
    type: {type: String, enum: types, required:true},
    category: {type: String, enum: categories, required: true},
    dateAdded: {type: Date, default: new Date()},
    data: {
        tracklist:{type: [String], default: undefined},
        description: String,
        artist: String,
        title: String,
        releaseYear: Number,
        brand: String,
        discs: Number,
    },
})

StoreItemSchema.virtual("costSEK").get(function() {
    return this.costUSD * 10.55
})

const StoreItemModel = model("store_items", StoreItemSchema)

StoreItemModel.createIndexes({
    title: "text",
    default_language: "english",
}, err => err && console.log("error:", err))

module.exports = StoreItemModel