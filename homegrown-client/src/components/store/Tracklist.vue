<script lang="ts">
import { defineComponent, } from 'vue'
import type {PropType} from "vue"
import Text from '../globals/text/Text.vue'
import TextTitle from '../globals/text/TextTitle.vue'

export default defineComponent({
	components: { TextTitle, Text},
    props: {
        tracks: {
            type: Array as PropType<string[]>,
            required: true
        }
    },
    setup() {
        
    },
})
</script>

<template>
    <div class="tracklist">
        <div class="info">
            <TextTitle bold>Tracklist</TextTitle>
        </div>
        <div class="list">
            <div class="track" v-for="(track, i) in $props.tracks" :key="i+track">
                <Text class="number">{{i + 1}}.</Text>
                <TextTitle>{{track}}</TextTitle>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .tracklist {
        display: flex;
        flex-direction: column;
        margin: 0 0 20px;

        .info {
            background: $dark-color3;
            padding: 5px;
            display: flex;
            justify-content: center;
        }
        .list {
            display: flex;
            flex-direction: column;
            .track {
                padding: 5px;
                display: flex;
                gap: 5px;
                .number {
                    width: 15px;
                }
                &:nth-child(even) {
                    background: $dark-color3;
                }
            }
        }
    }
</style>