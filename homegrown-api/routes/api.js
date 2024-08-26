const express = require("express")
const StoreItemModel = require("../models/StoreItemModel")
const api = express.Router()
const {sendDelay} = require("../utils")
const fs = require("fs")
const WishlistModel = require("../models/WishlistModel")

api.get("/get-store-items", async (req, res, next) => {
    const {type, order, search, category } = req.query

    const query = {
        ...(type ? {type} : null),
        ...(category ? {category} : null),
        ...(search ? {$text: {$search: search}} : null)
    }
    const sort = {
        ...(order === "Newest" ? {_id: -1} : null),
        ...(order === "Oldest" ? {_id: 1} : null),
        ...(order === "Alphabetically A-Z" ? {title: 1} : null),
        ...(order === "Alphabetically Z-A" ? {title: -1} : null),
        ...(order === "Cost Lowest-Highest" ? {costUSD: 1} : null),
        ...(order === "Cost Highest-Lowest" ? {costUSD: -1} : null),
    }
    console.log(sort, query)
    let storeItems = await StoreItemModel.find(query).sort(sort) || []

    if (storeItems.length === 0) {
        res.status(200).send({
            message: `No Matches.`,
            content: storeItems
        })
        return
    }
    res.status(200).send({
        message: `Items fetched successfully`,
        content: storeItems
    })
    
})
api.get("/get-store-item/:id", async (req, res) => {
    const _id = req.params.id
    if (!_id) { res.send({err: "No ID provided."}); return }
    if (_id.length !== 24) { res.send({err: "Provided ID is malformed."}); return }
    const storeItem = await StoreItemModel.findById(_id)
    if (!storeItem) { res.status(404).send({ message: "Post not found.", content: undefined })
    }
    res.send({
        message: `item ${storeItem._id} successfully fetched.`,
        content: storeItem
    })
})
api.get("/get-wishlist-by-user/:userId", async (req,res) => {
    const { userId } = req.params
    const { containUser } = req.query
    if (!userId) { res.status(404).send({message: "User ID not provided."}); return }

    const populate = containUser ? ["list", "user"] : ["list"]
    const wishlist = await WishlistModel.findOne({user: userId}).populate(populate)

    wishlist 
        ? res.send({message: "Successfully fetched wishlist.", content: wishlist.list})
        : res.status(400).send({message: "Could not fetch wishlist."})
})

api.get("/set-to-my-wishlist/:itemId", async (req,res) => {
    const {itemId} = req.params
    if (!itemId) { res.status(400).send({message: "No ID Provided"}); return }

    const resUser = await res.locals.user()
    if (!resUser) { res.status(400).send({message: "Could not find user."}); return }

    const wishlist = await WishlistModel.findOne({user: resUser._id}).populate("user")
    if (!wishlist || Array.isArray(wishlist.list) == false) { res.status(500).send({message: "Could not find wishlist."}); return }

    if (wishlist.list.includes(itemId)) {
        wishlist.list = wishlist.list.filter(item => item.toString() !== itemId.toString())
        console.log(`Removed ${itemId} from ${wishlist.user.username}'s wishlist.`)
    } else {
        wishlist.list.push(itemId)
        console.log(`Added ${itemId} to ${wishlist.user.username}'s wishlist.`)
    }

    await wishlist.save()
    const updatedWishlist = await WishlistModel.findOne({user: resUser._id}).populate("list")
    res.send({
        message: `Successfully edited ${wishlist.user.username}'s wishlist.`,
        content: updatedWishlist.list
    })
})

module.exports = api