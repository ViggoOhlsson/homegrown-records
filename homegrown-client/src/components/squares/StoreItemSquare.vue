<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import type {PropType} from "vue"
import type IStoreItem from "@/models/IStoreItem"
import TextTitle from '../globals/text/TextTitle.vue'
import Text from '../globals/text/Text.vue'
import TypeTag from './TypeTag.vue'
import {formatCurrency} from "@/formats"
import useCart from '@/stores/useCart'
import useApp from '@/stores/useApp'

export default defineComponent({
	components: { TextTitle, Text, TypeTag },
    props: {
        link: {
            required:false,
            type: Boolean,
            default: true
        },
        item: {
            type: Object as PropType<IStoreItem>,
            required: true
        }
    },
    setup(props, {emit}) {
        const cart = useCart()
        const app = useApp()


        return {
            cart,
            formatCurrency,
            app
        }
        
    },
})
</script>

<template>
    <component :is="$props.link ? 'router-link' : 'div'" tabindex="0" :to="{name: 'store-item', params: {id: $props.item._id}}" :title="`${$props.item.title} | ${$props.item.type} | ${formatCurrency($props.item.costUSD, app.currency)}`" class="store-item-container">
        <div class="thumbnail">
            <img :src="$props.item.thumbnail" :alt="$props.item.title">
            <div class="overlay">
                <i class="fa-solid fa-info-circle"></i>
            </div>
        </div>
        <div class="title-container">
            <Text ellipsis bold >{{$props.item.title}}</Text>
        </div>
        <div class="cost-type">
            <TypeTag :type="$props.item.type" />
            <span>{{formatCurrency($props.item.costUSD, app.currency)}}</span>
        </div>
    </component>
</template>

<style lang="scss" scoped>
    .store-item-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        text-decoration: none;
        color: white;
        &:hover, &:target {
            .thumbnail > .overlay {
                opacity: 1; 
            }
        }
        .thumbnail {
            position: relative;
            aspect-ratio: 1/1;
            width: 100%;
            img {
                display: block;
                width: 100%;
            }
            .overlay {
                transition: opacity 0.1s;
                opacity: 0;
                display: flex;
                position:absolute;
                top:0;
                left:0;
                width: 100%;
                height: 100%;
                cursor: pointer;
                text-shadow: #000000 1px 1px 2px;
                background: rgba($color: #000000, $alpha: 0.5);
                color: $primary-color;
                font-size: 1.5em;
                align-items: center;
                justify-content: center;
                a {
                    font-size: 1.25em;
                    text-decoration: none;
                    color: $primary-color;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    width: 100%;
                    transition: all 0.05s;
                    &:hover {
                        background: rgba($color: #000000, $alpha: 0.5);
                    }

                }
            }
        }
        .cost-type {
            display: flex;
            flex-wrap: wrap-reverse;
            justify-content: space-between;
        }
    }
</style>