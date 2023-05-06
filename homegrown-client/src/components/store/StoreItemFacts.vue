<script lang="ts">
import { defineComponent } from 'vue'
import type {PropType} from "vue"
import type IStoreItem from '@/models/IStoreItem'
import Text from "@/components/globals/text/Text.vue"
import TextTitle from "@/components/globals/text/TextTitle.vue"
import Tracklist from './Tracklist.vue'

export default defineComponent({
    components: {
        Text,
        TextTitle,
        Tracklist
    },
    props: {
        storeItem: {
            type: Object as PropType<IStoreItem>,
            required: true
        },
        registering: {
            type:Boolean,
            default: false
        }
    },
    setup() {
    },
})
</script>

<template>
    <Tracklist :tracks="storeItem.data.tracklist" v-if="registering && storeItem.data.tracklist"></Tracklist>
    <div v-if="storeItem.title && $props.registering" class="store-item-fact">
        <TextTitle>Full Title:</TextTitle>
        <Text bold>{{storeItem.title}}</Text>
    </div>
    <div v-if="storeItem.thumbnail && $props.registering" class="store-item-fact">
        <TextTitle>Thumbnail:</TextTitle>
        <!-- <Text bold>{{storeItem.thumbnail}}</Text> -->
        <img :src="storeItem.thumbnail">
    </div>
    <div v-if="storeItem.data.description && $props.registering" class="store-item-fact">
        <TextTitle>Description:</TextTitle>
        <Text>{{storeItem.data.description}}</Text>
    </div>
    <div v-if="storeItem.costUSD && $props.registering" class="store-item-fact">
        <TextTitle>Cost:</TextTitle>
        <Text bold>{{storeItem.costUSD}}</Text>
    </div>
    <div v-if="storeItem.type && storeItem.type !== 'Type'" class="store-item-fact">
        <TextTitle>Type:</TextTitle>
        <Text bold>{{storeItem.type}}</Text>
    </div>
    <div v-if="storeItem.category && storeItem.category !== 'Category'" class="store-item-fact">
        <TextTitle>Category:</TextTitle>
        <Text bold>{{storeItem.category}}</Text>
    </div>
    <div v-if="storeItem.data.title" class="store-item-fact">
        <TextTitle>Title:</TextTitle>
        <Text bold>{{storeItem.data.title}}</Text>
    </div>
    <div v-if="storeItem.data.artist" class="store-item-fact">
        <TextTitle>Artist:</TextTitle>
        <Text bold>{{storeItem.data.artist}}</Text>
    </div>
    <div v-if="storeItem.data.brand" class="store-item-fact">
        <TextTitle>Brand:</TextTitle>
        <Text bold>{{storeItem.data.brand}}</Text>
    </div>
    <div v-if="storeItem.data.releaseYear" class="store-item-fact">
        <TextTitle>Year Of Release:</TextTitle>
        <Text bold>{{storeItem.data.releaseYear}}</Text>
    </div>
    <div v-if="storeItem.data.discs" class="store-item-fact">
        <TextTitle>Discs</TextTitle>
        <Text bold>{{storeItem.data.discs}}</Text>
    </div>
</template>

<style lang="scss" scoped>
    .store-item-fact {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        align-items: center;
        img {
            height: 50px;
            aspect-ratio: 1/1;
        }
    }
    .cost {
        // margin: 10px 0 0;
        text-align: center;
    }

</style>