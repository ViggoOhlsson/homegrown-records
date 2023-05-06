const {model, Schema, Types} = require("mongoose");

const WishlistSchema = {
    user: {type: Types.ObjectId, ref: "users", required:true},
    list: [{
        type: Types.ObjectId, ref: "store_items",
        required: true,
    }]
}

const WishlistModel = model("wishlists", WishlistSchema)

module.exports = WishlistModel