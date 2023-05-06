<script lang="ts">
import Text from '@/components/globals/text/Text.vue'
import useCart from '@/stores/useCart'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        Text
    },
    setup() {
        const cart = useCart()

        return {
            cart
        }
        
    },
})
</script>

<template>
    <div class="checkout">
        <div class="cart-container">
            <div class="cart-list">
                <Text v-for="cartItem in cart.cartItems" :key="cartItem.storeItem._id">x{{cartItem.amount}} {{cartItem.storeItem.title}}</Text>
            </div>
        </div>
        <div class="info-container">
            INPUT INFO HERE
            <img src="/public/okayegpay.png" alt="">
        </div>
    </div>    
</template>

<style lang="scss" scoped>
    .checkout {
        margin: 20px 10px;
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 20px;
        @include desktop {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    .cart-container {

    }

</style>