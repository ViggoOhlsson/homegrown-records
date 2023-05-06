<script lang="ts">
import type {ICartItem} from '@/models/ICartItem'
import { defineComponent } from 'vue'
import type {PropType} from "@vue/runtime-dom"
import Text from '../globals/text/Text.vue'
import {formatCurrency} from "@/formats"
import TextTitle from '../globals/text/TextTitle.vue'
import PrimaryButton from '../globals/buttons/PrimaryButton.vue'
import useCart from '@/stores/useCart'
import lodash from "lodash"
import useApp from '@/stores/useApp'

export default defineComponent({
    components: {
        Text,
        TextTitle,
        PrimaryButton
    },
    props: {
        cartItem: {
            required: true,
            type: Object as PropType<ICartItem>
        },
        noEdit: {
            type:Boolean,
            default: false
        }
    },
    setup() {
        const cart = useCart()
        const app = useApp()
        return {
            lodash,
            app,
            formatCurrency,
            cart
        }
    },
})
</script>

<template>
    <div class="cart-item">
        <div class="identity">
            <div class="image">
                <img :src="$props.cartItem.storeItem.thumbnail" :alt="$props.cartItem.storeItem.title">
            </div>
            <div class="body">
                <Text :em="0.8">{{$props.cartItem.storeItem.title}}</Text>
            </div>
        </div>
        <div class="function">
            <div class="cost">
                <Text><TextTitle v-if="$props.cartItem.amount > 1">x{{$props.cartItem.amount}}</TextTitle> {{formatCurrency($props.cartItem.storeItem.costUSD * $props.cartItem.amount, app.currency)}}</Text>
            </div>
            <PrimaryButton v-if="!$props.noEdit" @click="() => cart.addItem($props.cartItem.storeItem)" square :title="`Add ${$props.cartItem.storeItem.title}`"><i class="fa-solid fa-plus"></i></PrimaryButton>
            <PrimaryButton v-if="!$props.noEdit" @click="() => cart.removeItem($props.cartItem.storeItem)" square :title="`Remove ${$props.cartItem.storeItem.title}`"><i class="fa-solid fa-minus"></i></PrimaryButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .cart-item {
        box-sizing: border-box;
        padding: 5px;
        background-color: $dark-color3;
        display: flex;
        flex-wrap: wrap;
        // height: 50px;
        gap: 10px;
        width: 100%;
        .identity {
            flex-grow: 1;
            display: flex;
            gap: 10px;
        }
        .image {
            height: 100%;
            img {
                display: block;
                height: 40px;
            }
        }
        .function {
            justify-content: flex-end;
            flex-grow: 1;
            display: flex;
            gap: 10px;
        }
        .body {
            align-self: center;
            flex-grow: 1;
            max-height: 2em;
            .span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .body, .cost {
            display: flex;
            align-items: center;
        }
        &:nth-child(odd) {
            background-color: $dark-color4;
        }
    }

</style>