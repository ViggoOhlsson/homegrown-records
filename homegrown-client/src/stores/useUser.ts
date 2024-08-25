import type IStoreItem from "@/models/IStoreItem"
import type IUser from "@/models/IUser"
import useStoreService from "@/services/useStoreService"
import useUserService from "@/services/useUserService"
import { defineStore } from "pinia"
import { onMounted, ref } from "vue"

export default defineStore("user", () => {
    const {validateUser} = useUserService()
    const {getWishlistByUser} = useStoreService()
    const data = ref<IUser>()
    const wishlist = ref<IStoreItem[]>([])


    const logUser = () => console.log("user:", data.value)

    onMounted(async () => {
        // const validatedUser = await validateUser()
        // validatedUser ? data.value = validatedUser : null
        // if (!validatedUser) return
        // wishlist.value = await getWishlistByUser(validatedUser._id)

    })

    return {
        data,
        wishlist,
        logUser
    }
})