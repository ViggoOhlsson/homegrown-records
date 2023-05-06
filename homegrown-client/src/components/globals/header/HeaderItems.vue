<script lang="ts">
import useCart from '@/stores/useCart'
import useUser from '@/stores/useUser'
import { defineComponent, onMounted } from 'vue'
import ModalBase from "@/components/globals/modal/ModalBase.vue"
import { storeToRefs } from 'pinia'
import CartItemList from '@/components/cart/CartItemList.vue'
import PrimaryButton from '../buttons/PrimaryButton.vue'
import SecondaryButton from '../buttons/SecondaryButton.vue'
import Text from '../text/Text.vue'
import CartModal from '@/components/cart/CartModal.vue'

export default defineComponent({
	components: { 
        ModalBase,
        CartItemList,
        PrimaryButton,
        SecondaryButton,
        Text,
        CartModal
        },
    setup() {
        const cart = useCart()
        const user = useUser()
        // const {cartItems} = storeToRefs(cart)
        // onMounted(() => console.log("cart items:", cartItems.value))
        return {
            cart,
            user,
        }
    },
})
</script>

<template>
    <div class="items-container">
        <div class="cart-container container">
            <SecondaryButton @click="cart.toggleShowCart">
                <i class="fa-solid fa-cart-shopping"></i>
                <transition name="bounce">
                    <span v-if="cart.totalItems > 0" class="total-items-bubble" :key="cart.totalItems">{{cart.totalItems}}</span>
                </transition>
            </SecondaryButton>
        </div>
    </div>
    <CartModal :show="cart.showCart"></CartModal>
</template>

<style lang="scss">
    .items-container {
        display: flex;
        .container {
			position:relative;
            button {
                position: relative;
                height: 75px;
                aspect-ratio: 1/1;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1.25em;
                &:hover {
                    background: $dark-color3;
                    color: $primary-color;
                    .total-items-bubble {
                        background: white;
                    }
                }
                .total-items-bubble {
                    position: absolute;
                    top: 0;
                    right: 0;
                    translate: -75% 75%;
                    font-size: 0.65em;
                    background: $primary-color;
                    width: 25%;
                    height: 25%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    color: $dark-color1;
                    font-weight: bold;

                }
            }
        }
    }
    
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-out 0.5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }

</style>