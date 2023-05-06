const {Schema, model, Types} = require("mongoose")
const WishlistModel = require("./WishlistModel")

const UserSchema = new Schema({
    username: {type:String, required: true, min: 3, max: 32, unique: true},
    password: {type:String, required: true, select: false},
    credits: {type:Number, required:true, default: 0},
    profile_picture: {type:String, requiredd: true, default: "default"},
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true},
    isAdmin: {type:Boolean, required: true, default: false},
    isDisabled: {type:Boolean, default: false},
    registeredAt: {type:Date, required: true, default: new Date()}
})

UserSchema.virtual("fullname").get(function () {
    return `${this.firstname} ${this.lastname}`
})
UserSchema.virtual("profile_picture_url").get(function () {
    return `${process.env.URL}/content/profile_pics/${this.profile_picture}.png`
})

UserSchema.methods.createWishlist = async function () {
    const alreadyExists = await WishlistModel.findOne({user: this._id})
    if (alreadyExists) return false

    const newWishlist = new WishlistModel({
        user: new Types.ObjectId(this._id),
        wishlist: []
    })
    await newWishlist.save()
    console.log(`Created new wishlist for user '${this.username}'`);
    return true
}

const UserModel = model("users", UserSchema)

module.exports = UserModel


