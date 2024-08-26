const express = require("express")
const StoreItemModel = require("../models/StoreItemModel")
const router = express.Router()
const {sendDelay} = require("../utils")
const fs = require("fs")
const sharp = require("sharp")

router.post("/authorize", async (req,res) => {
    const user = await res.locals.user()

    if (user.isAdmin !== true) {
        res.status(401).send({
            message: "User could not be authorized.",
            content: {
                isAdmin: false
            }
        })
    } else {
        res.status(200).send({
            message: `Authorized user '${user.username}'`,
            content: {
                user,
                isAdmin: user.isAdmin
            }
        })
    }
})

router.post("/register-store-item", async (req, res) => {
    const { item } = req.body
    const thumbnail = req.files?.thumbnail

    if (!thumbnail) {
        res.status(400).send("No Thumbnail Provided.")
        return 
    }
    const user = await res.locals.user()

    console.log("recieved item:", item)
    if (user.isAdmin !== true) {res.status(401).send({message: "Unauthorized."}); return}

    try {
        const thumbnail256x = sharp({
            
        }) 
        const newStoreItem = new StoreItemModel({
            title: item.title,
            costUSD: item.costUSD,
            type: item.type,
            category: item.category,
            thumbnail: item.thumbnail,
            data: {
                ...(item.data.tracklist && item.data.tracklist.length > 0 ? {tracklist: item.data.tracklist} : null),
                ...(item.data.title ? {title: item.data.title} : null),
                ...(item.data.artist ? {artist: item.data.artist} : null),
                ...(item.data.description ? {description: item.data.description} : null),
                ...(item.data.discs ? {discs: item.data.discs} : null),
                ...(item.data.releaseYear ? {releaseYear: item.data.releaseYear} : null),
                ...(item.data.artist ? {artist: item.data.artist} : null),
            }
        })
        console.log("new store item:", newStoreItem)
        await newStoreItem.save()
        res.send({
            message: `Successfully saved '${newStoreItem.title}'`,
            content: newStoreItem
        }) 
    } catch (err) {
        res.status(500).send({
            message: "Error."
        })
    }
})
router.post("/delete-store-item/:id", async (req, res) => {
    const { id } = req.params
    const user = await res.locals.user()

    if (user.admin !== true) { res.status(401).send({message: "Could not authorize user."}); return }theruzz

    if (!id || id.length !== 24) {res.send({message: "Provided ID is malformed."})}
})


module.exports = router