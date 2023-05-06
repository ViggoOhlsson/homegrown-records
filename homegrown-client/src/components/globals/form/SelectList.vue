<script lang="ts">
import {computed, ref, watch, } from "vue"
import type {PropType} from "vue"
import { defineComponent, } from 'vue'
import Text from '../text/Text.vue'
import TextTitle from "../text/TextTitle.vue"

export default defineComponent({
    components: {
        Text,
        TextTitle
    },
    props: {
        modelValue: {
            type:String,
            required:true
        },
        options: {
            type:Array as PropType<string[]>,
            required: true
        },
    },
    emits: [
        'update:modelValue'
    ],
    setup(props, {emit}) {
        
        const setOption = (option: string) => {
            emit("update:modelValue", option)
        }
        const displayDropdown = ref(false)

        return {
            setOption,
            displayDropdown
        }


    },
})
</script>

<template>
    <div class="select">
        <button class="head" @click="displayDropdown = !displayDropdown">
            <Text bold>{{$props.modelValue}}</Text>
        </button>
        <transition name="fade">
            <div class="options" v-if="displayDropdown === true">
                <button tabindex="0" :class="[{selected: $props.modelValue === option}]" @click="() => {displayDropdown = false; setOption(option)}" v-for="option in $props.options" :value="option" :key="option">{{option}}</button>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    .select {
        outline: none;
        translate: box-shadow 0.2s;
        position: relative;
        background: $dark-color3;
        &:hover {
            background: $dark-color1;
        }
        .head {
            margin: 0;
            padding: 0;
            background: none;
            color: white;
            border:none;
            text-align: start;
            cursor: pointer;
            font-size: 1em;
            padding: 10px;
            width: 100%;

        }
        .options {
            position: absolute;
            bottom: 0;
            left: 0;
            translate: 0 100%;
            display: flex;
            flex-direction: column;
            z-index: 1;
            min-width: 100%;
            button {
                background: none;
                border: none;
                text-align: start;
                color: white;
                font-size: 1em;
                padding: 10px;
                cursor: pointer;
                &:nth-child(odd) {
                    background: $dark-color4;
                }
                &:nth-child(even) {
                    background: $dark-color3;;
                }
                &:hover {
                    background: $primary-color;
                    color: $dark-color1
                }
            }
        }
    }
    .fade {
        &-enter-from, &-leave-to {
            opacity: 0;
        }
        &-enter-active, &-leave-active {
            transition: all 0.05s;
        }
    }
</style>