import { exampleStoreItems } from "@/api"
import type APIResponse from "@/models/APIResponse"
import type IStoreFilter from "@/models/IStoreFilter"
import type IStoreItem from "@/models/IStoreItem"
import { objectToQueryString } from "@/utils"
import axios from "axios"
export default () => {
    const getStoreItems = async (filter: IStoreFilter) => {
        return {
            content: exampleStoreItems
        }
        // const query = objectToQueryString(filter)
        // let res = await axios.get<APIResponse<IStoreItem[]>>(`${import.meta.env.VITE_API_URL}/api/get-store-items${query}`)
        // return res.data
    }
    const getStoreItem = async (_id:string): Promise<IStoreItem> => {
        const storeItem = exampleStoreItems.find(item => item._id == _id)
        return storeItem
        // let res = await axios.get<APIResponse<IStoreItem>>(`${import.meta.env.VITE_API_URL}/api/get-store-item/${_id}`)
        // return res.data.content
    }
    // removes and adds in the same function, returns new wishlist
    const setToWishlist = async (_id:string) => {
        let res = await axios.get<APIResponse<IStoreItem[]>>(`${import.meta.env.VITE_API_URL}/api/set-to-my-wishlist/${_id}`)
        console.log(res.data.message || "Error")
        return res.data.content
    }
    const getWishlistByUser = async (userId:string) => {
        let res = await axios.get<APIResponse<IStoreItem[]>>(`${import.meta.env.VITE_API_URL}/api/get-wishlist-by-user/${userId}`)
        return res.data.content
    }

    return {
        getStoreItems,
        getStoreItem,
        setToWishlist,
        getWishlistByUser
    }
}