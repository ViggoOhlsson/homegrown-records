<script lang="ts">
import StoreItemSquare from '@/components/squares/StoreItemSquare.vue'
import type IStoreItem from '@/models/IStoreItem'
import {lilFingyThumb, quartersThumb} from "@/data"
import { defineComponent, onMounted, ref, watch } from 'vue'
import useStoreService from "@/services/useStoreService"
import StoreFilter from "@/components/store/StoreFilter.vue"
import GridStyleButtons from "@/components/store/GridStyleButtons.vue"
import type IStoreFilter from '@/models/IStoreFilter'
import {useDebounce} from "@/utils"
import Text from '@/components/globals/text/Text.vue'
import TextTitle from '@/components/globals/text/TextTitle.vue'
import SecondaryButton from '@/components/globals/buttons/SecondaryButton.vue'
import Loader from '@/components/globals/misc/Loader.vue'

export default defineComponent({
	components: { StoreItemSquare, StoreFilter, GridStyleButtons, Text, TextTitle, SecondaryButton, Loader },
    setup() {
        const {getStoreItems} = useStoreService()

        const storeItems = ref<IStoreItem[]>([])
        const storeItemsMessage = ref("")
        const filter = ref<IStoreFilter>({})
        const mobileGridColumns = ref(parseInt(localStorage.getItem("mobile-grid-columns") || "2"))
        watch(mobileGridColumns, (newVal) => localStorage.setItem("mobile-grid-columns", newVal.toString()))

        watch(filter, async () => {
            storeItemsMessage.value = ""
            fetchStoreItems()
        })
        const fetchStoreItems = useDebounce(async () => {
            const res = await getStoreItems(filter.value)
            storeItems.value = res.content
            storeItemsMessage.value = res.message || ""
        }, 500)
        onMounted(async () => {

            const res = await getStoreItems(filter.value)
            storeItems.value = res.content
            storeItemsMessage.value = res.message || ""
        })

        return {
            storeItems,
            storeItemsMessage,
            filter,
            mobileGridColumns,
        }
    },
})
</script>

<template>
    <div class="store">
        <StoreFilter v-model="filter"></StoreFilter>
        <div class="grid-buttons-container">
            <GridStyleButtons v-model="mobileGridColumns"></GridStyleButtons>
        </div>
        <!-- <div class="no-items-found" v-if="storeItemsMessage === ''">
            <TextTitle :em="1.2" bold>{{storeItemsMessage}}</TextTitle>
        </div> -->
	    <Loader fixed v-if="storeItemsMessage !== 'No Matches.' && !storeItems.length"></Loader>
        <div class="items-grid">
            <StoreItemSquare link v-for="item in storeItems" :item="item" :key="item._id"></StoreItemSquare>
        </div>
    </div>  
</template>

<style lang="scss" scoped>
    .store {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        .grid-buttons-container {
            padding: 20px 10px 0;
            display: flex;
            justify-content: flex-end;
            @include tablet {
                display: none;
            }
        }
        .no-items-found {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
            text-align: center;
        }
        .items-grid {
            display: grid;
            grid-template-columns: repeat(v-bind(mobileGridColumns), minmax(0, 1fr));
            padding: 20px 10px;
            gap:20px;
            @include tablet {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @include desktop {
                grid-template-columns: repeat(4, minmax(0, 1fr));
            }
        }
    }

</style>