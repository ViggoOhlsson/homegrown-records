<script lang="ts">
import useCart from '@/stores/useCart'
import useUser from '@/stores/useUser'
import { defineComponent } from 'vue'
import type {PropType} from "vue"
import PrimaryButton from '../globals/buttons/PrimaryButton.vue'
import SecondaryButton from '../globals/buttons/SecondaryButton.vue'
import type IStoreItem from '@/models/IStoreItem'
import useStoreService from '@/services/useStoreService'
import { storeToRefs } from 'pinia'

export default defineComponent({
	components: { PrimaryButton, SecondaryButton },
    emits: [
        "addToCart",
        "addToWishlist",
    ],
    props: {
        storeItem: {
            type: Object as PropType<IStoreItem>,
            required: true
        }
    },
    setup(props, {emit}) {
        const cart = useCart()
        const user = useUser()
        const {wishlist} = storeToRefs(user)
        const { setToWishlist } = useStoreService()

        const onSetToWishlist = async () => {
            const newWishlist = await setToWishlist(props.storeItem._id)
            if (!user.data) return
            wishlist.value = newWishlist
        }

        return {
            cart,
            user,
            onSetToWishlist
        }
        
    },
})
</script>

<template>
    <div class="store-item-buttons-container">
        <SecondaryButton v-if="user" @click="user.data && onSetToWishlist()"><i class="fa-solid fa-star"></i> Add To Whishlist</SecondaryButton>
        <PrimaryButton @click="cart.addItem(storeItem)"><i class="fa-solid fa-shopping-cart"></i> Add To Cart</PrimaryButton>
        <SecondaryButton class="to-checkout" @click="() => {cart.addItem(storeItem); $router.push({name: 'checkout'})}">To Checkout <i class="fa-solid fa-arrow-right"></i></SecondaryButton>
    </div>
</template>

<style lang="scss">

    .store-item-buttons-container {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        .to-checkout {
            grid-column: 1/3;
        }
    }

</style>