<script lang="ts">
import { defineComponent } from 'vue'
import Text from '../globals/text/Text.vue'

export default defineComponent({
	components: { Text },
    props: {
        image:String,
    },
    setup() {
        
    },
})
</script>

<template>
    <div class="section-square">
        <div class="content">
            <div class="image">
                <img :src="image" alt="">
            </div>
            <div class="title">
                <Text bold class="title-text">
                    <slot></slot>
                </Text>
                <i class="fa-solid fa-arrow-right title-arrow"></i>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .section-square {
        cursor: pointer;
        i {
            display: none;
        }
        &:hover, &:target {
            .title-text {
                display: none;
            }
            i {
                display: block;
            }
            img {
                scale: 1.05;
            }
        }
        .content {
            display: flex;
            flex-direction: column;
            .image {
                width: 100%;
                aspect-ratio: 1/1;
                overflow: hidden;
                img {   
                    transition: all ease-out 0.5s;
                    width: 100%;

                }
            }
            .title {
                background: $primary-color;
                color: $dark-color1;
                aspect-ratio: 5/1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3em;
            }
        }
    }
</style>