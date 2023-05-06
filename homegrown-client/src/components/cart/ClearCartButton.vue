<script lang="ts">
import useCart from '@/stores/useCart'
import { defineComponent, ref } from 'vue'
import PrimaryButton from '../globals/buttons/PrimaryButton.vue'
import SecondaryButton from '../globals/buttons/SecondaryButton.vue'

export default defineComponent({
    emits: [
        'close'
    ],
	components: { PrimaryButton, SecondaryButton },
    setup(props, {emit}) {
        const cart = useCart()
        const clearingCart = ref(false)

        const clearCart = () => {
            cart.clearCart()
            clearingCart.value = false;
            emit("close")
        }

        return {
            clearingCart,
            cart,
            clearCart
        }
    },
})
</script>

<template>
    <SecondaryButton v-if="!clearingCart" @click="clearingCart = true"><i class="fa-solid fa-trash"></i>  Clear Cart</SecondaryButton>
    <PrimaryButton v-else @click="clearCart"><i class="fa-solid fa-warning"></i> Confirm</PrimaryButton>
</template>

<style lang="scss" scoped>

</style>