<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

<template>
    <button class="header-button">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    .header-button {
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
</style>