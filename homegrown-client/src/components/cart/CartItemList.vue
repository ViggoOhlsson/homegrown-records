<script lang="ts">
import type {ICartItem} from "@/models/ICartItem"
import useCart from '@/stores/useCart'
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted } from 'vue'
import CartItemCell from './CartItemCell.vue'
import {formatCurrency} from "@/formats"
import Text from "@/components/globals/text/Text.vue"
import useUser from "@/stores/useUser"
import useApp from "@/stores/useApp"


export default defineComponent({
	components: { CartItemCell, Text },
    props: {
        noEdit: {
            type: Boolean,
            default: false
        },
    },
    setup() {
        const cart = useCart()
        const { cartItems } = storeToRefs(cart)
        const user = useUser()
        const app = useApp()

        return {
            cart,
            cartItems,
            formatCurrency,
            user,
            app
        }
    },
})
</script>

<template> 
    <div class="cart-item-list" >
        <transition-group name="cart-item-fade">
            <CartItemCell :noEdit="$props.noEdit" :cartItem="cartItem" v-for="cartItem in cartItems" :key="cartItem.storeItem._id"  />
        </transition-group>
        <Text class="total"><span>Total: </span><b>{{formatCurrency(cart.totalCost, app.currency)}}</b></Text>
    </div>
</template>

<style lang="scss" scoped>
    .cart-item-list { 
        position: relative;
        display: flex;
        flex-direction: column;
        .total {
            gap: 5px;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding: 10px;
            box-sizing: border-box;
            span {
                color: $primary-color
            }
        }
    }
    .cart-item-fade {
        &-enter-from, &-leave-to {
            opacity: 0;
        }
        &-enter-active {
            transition: all 0.5s;
        } 
        &-leave-active {
            transition: all 0.5s;
            position: absolute;
        }
        &-move {
            transition: all 0.3s;

        }
    }

</style>