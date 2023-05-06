<script lang="ts">
import StoreItemSquare from '@/components/squares/StoreItemSquare.vue'
import type IStoreItem from '@/models/IStoreItem'
import {lilFingyThumb, quartersThumb} from "@/data"
import { defineComponent, onMounted, ref } from 'vue'
import useStoreService from "@/services/useStoreService"
import { useRoute } from 'vue-router'
import useCart from '@/stores/useCart'
import Tracklist from '@/components/store/Tracklist.vue'
import Text from '@/components/globals/text/Text.vue'
import TextTitle from '@/components/globals/text/TextTitle.vue'
import TypeTag from '@/components/squares/TypeTag.vue'
import StoreItemFacts from '@/components/store/StoreItemFacts.vue'
import StoreItemButtons from "@/components/store/StoreItemButtons.vue"
import Loader from '@/components/globals/misc/Loader.vue'
import {formatCurrency} from "@/formats"
import BackButton from '@/components/globals/buttons/BackButton.vue'
import { storeToRefs } from 'pinia'
import useApp from '@/stores/useApp'

export default defineComponent({
	components: { Tracklist, Text, TextTitle, TypeTag, StoreItemFacts, StoreItemButtons, Loader, BackButton },
    setup() {
        const error = ref("")
        const route = useRoute()
        const {getStoreItem} = useStoreService()
        const storeItem = ref<IStoreItem>()
        const cart = useCart()
        const app = useApp()

        onMounted(async () => {
            if (route.params.id) {
                const item = await getStoreItem(route.params.id + "")
                storeItem.value = item
                // storeItem.value.data.artist = ""
            }
        })
        return {
            storeItem,
            cart,
            error,
            formatCurrency,
            app
        }
    },
})
</script>

<template>
    <div class="store-item">
        <Loader v-if="!storeItem" fixed></Loader>
        <div class="main-head">
            <BackButton></BackButton>
        </div>
        <div class="content" v-if="storeItem">
            <div class="thumbnail">
                <img :src="storeItem.thumbnail" :alt="storeItem.title">
            </div>
            <div class="names">
                <Text v-if="!storeItem.data.title && !storeItem.data.artist" :em="1.2" bold >{{storeItem.title}}</Text>
                <Text v-if="storeItem.data.title" :em="1.5" bold>{{storeItem.data.title}}</Text>
                <Text v-if="storeItem.data.artist" dim bold>{{storeItem.data.artist}}</Text>
                <TypeTag :type="storeItem.type" />

            </div>
            <div class="description-wrapper" v-if="storeItem.data.description">
                <TextTitle bold>Description</TextTitle>
                <Text>{{storeItem.data.description}}</Text>
            </div>
        </div>
        <aside v-if="storeItem">
            <Tracklist v-if="storeItem.data.tracklist" :tracks="storeItem.data.tracklist"></Tracklist>
            <StoreItemFacts :storeItem="storeItem"></StoreItemFacts>
            <div class="single-display">
                <Text :em="1.5" bold>{{formatCurrency(storeItem.costUSD, app.currency)}}</Text>
                <Text :em="0.8" dim bold>Including VAT</Text>
            </div>
            <StoreItemButtons :storeItem="storeItem" />
        </aside>
    </div>  
</template>

<style lang="scss" scoped>
    .store-item {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px 10px;
        align-items: flex-start;
        @include tablet {
            .content {
                .description-wrapper {
                    grid-column: 1/-1;
                }

            }
        }
        @include desktop {
            grid-template-columns: 2fr 1fr;
        }
        .main-head {
            grid-column: 1/-1;
        }
        .content {
            display:grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px 10px;
            .thumbnail {
                aspect-ratio: 1/1;
                img {
                    width: 100%;
                    display: block;
                }
            }
            .description-wrapper {
                display: flex;
                flex-direction: column;
                gap: 10px;
                background: $dark-color2;
                padding: 20px;
                grid-column: 1/-1;
            }
            .names {
                display: flex;
                flex-direction: column;
                gap: 5px;
                align-items: flex-start;
            }
        }
        aside {
            background: $dark-color2;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: 10px;
            gap: 15px;
            .single-display {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 20px 0 0;
                text-align: center
            }
        }
        .gamer {
            overflow: hidden;
            grid-column: 1/-1;
        }
    }
</style>