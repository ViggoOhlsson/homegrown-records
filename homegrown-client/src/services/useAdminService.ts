import type APIResponse from "@/models/APIResponse"
import type IStoreItem from "@/models/IStoreItem"
import type IUser from "@/models/IUser"
import axios from "axios"
import { renderSlot } from "vue"

export interface IAuthorizeAdminResponse {
    user: Object
    isAdmin: boolean
}

export default () => {
    const authorizeAdmin = async () => {
        try {
            let res = await axios.post<APIResponse<IAuthorizeAdminResponse>>(`${import.meta.env.VITE_API_URL}/admin/authorize`)
            return res.data.content
        } catch (err) {
            return false
        }
    }
    const registerStoreItem = async (item: IStoreItem) => {
        let res = await axios.post<APIResponse<IStoreItem>>(`${import.meta.env.VITE_API_URL}/admin/register-store-item`, {
            item
        })
        return res.data
    }
    return {
        authorizeAdmin,
        registerStoreItem
    }
}