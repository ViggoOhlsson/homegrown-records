import type { ICartItem } from "@/models/ICartItem";
import type IStoreItem from "@/models/IStoreItem";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import z from "zod"

const CartItemSchema = z.object({
    name: z.string(),
    costUSD: z.number().min(0),
    image: z.string().url(),
})


export default defineStore('shoppingCart', () => {
    const loadCartItems = () => JSON.parse(localStorage.getItem("cart") || "[]")
    const saveCartItems = () => {
        localStorage.setItem("cart", JSON.stringify(cartItems.value))
    }

    const totalCost = computed(() => cartItems.value.reduce((part, a) => part + a.storeItem.costUSD * a.amount, 0))
    const totalItems = computed(() => cartItems.value.reduce((part, a) => part + a.amount, 0))
    const cartItems = ref<ICartItem[]>(loadCartItems() || [])

    watch(() => cartItems, () => {
        saveCartItems()
    })

    const showCart = ref(false)

    const clearCart = () => {
        cartItems.value = []
        saveCartItems()
    }

    const toggleShowCart = () => {
        showCart.value = !showCart.value
    }

    const removeItem = (storeItem:IStoreItem) => {
        let existingItemIndex = cartItems.value.findIndex(cartItem => cartItem.storeItem._id === storeItem._id)

        if (cartItems.value[existingItemIndex].amount === 1) {
            cartItems.value.splice(existingItemIndex, 1)
        } else {
            cartItems.value[existingItemIndex].amount += -1
        }
        saveCartItems()
    }

    const addItem = (storeItem:IStoreItem) => {
        let existingItemIndex = cartItems.value.findIndex(cartItem => cartItem.storeItem._id === storeItem._id)
        
        if (existingItemIndex === -1 ) {
            cartItems.value = [...cartItems.value, {
                amount: 1,
                storeItem
            }]
        } else {
            cartItems.value[existingItemIndex].amount += 1
        }
        saveCartItems()
    }

    return {
        toggleShowCart,
        showCart,
        totalCost,
        totalItems,
        cartItems,
        clearCart,
        addItem,
        removeItem
        
    }
})