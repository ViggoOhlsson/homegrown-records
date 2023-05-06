<script lang="ts">
import useCart from '@/stores/useCart'
import { defineComponent } from 'vue'
import ModalBase from "@/components/globals/modal/ModalBase.vue"
import CartItemList from "@/components/cart/CartItemList.vue"
import SecondaryButton from '../globals/buttons/SecondaryButton.vue'
import PrimaryButton from '../globals/buttons/PrimaryButton.vue'
import Text from '../globals/text/Text.vue'
import ClearCartButton from './ClearCartButton.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    props: {
        show: Boolean 
    }, 
    components: {
        ModalBase,
        SecondaryButton,
        PrimaryButton,
        CartItemList,
        Text,
        ClearCartButton
    },
    setup() {
        const cart = useCart()
        const router = useRouter()

        const gotoCheckout = () => {
            router.push({name: "checkout"})
            cart.toggleShowCart()
        }

        return {
            cart,
            gotoCheckout
        }
    },
})
</script>

<template>
    <ModalBase :show="$props.show || false" :title="'My Cart'" @close="cart.toggleShowCart">
        <CartItemList v-if="cart.cartItems.length > 0" />
        <Text class="empty-cart" v-else>You cart is empty</Text>
        <template v-slot:footer class="footer">
            <ClearCartButton @close="cart.showCart = false" />
            <PrimaryButton @click="gotoCheckout">To Checkout <i class="fa-solid fa-arrow-right"></i></PrimaryButton>
        </template>
    </ModalBase>
</template>

<style lang="scss" scoped>
.empty-cart {
    width: 100%;
    text-align: center;
}

</style>