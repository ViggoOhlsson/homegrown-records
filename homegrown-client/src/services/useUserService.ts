import { defaultAdminUser } from "@/api"
import type APIResponse from "@/models/APIResponse"
import type IStoreItem from "@/models/IStoreItem"
import type IUser from "@/models/IUser"
import axios from "axios"
import { renderSlot } from "vue"


export interface IRegisterObject {
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
}
export interface ILoginObject {
    username: string
    password: string
}


export default () => {
    const validateUser = async () => {
        let res = await axios.post<APIResponse<IUser>>(`${import.meta.env.VITE_API_URL}/users/validate`)
        return res.data.content
    }
    const register = async (user: IRegisterObject) => {
        let res = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, user)
        return res.data
    }
    const login = async (user: ILoginObject) => {
        
        if (user.username == "admin" && user.password == "password") {
            return defaultAdminUser
        } else {
            throw new Error("Incorrect Credentials.")
        }
    }
    const logout = async () => {
        let res = await  axios.get<APIResponse<Boolean>>(`${import.meta.env.VITE_API_URL}/users/logout`)
        return res.data.content

    }
    return {
        validateUser,
        register,
        login,
        logout
    }
}