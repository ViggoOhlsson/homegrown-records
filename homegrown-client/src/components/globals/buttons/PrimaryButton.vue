<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        square: {
            type:Boolean,
            required:false
        },
        stretch: {
            type:Boolean,
            required:false
        }
    },
    setup() {
        
    },
})
</script>

<template>
    <button :class="[{square: $props.square}]">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    button {
        cursor: pointer;
        padding:  15px;
        font-weight: bold;
        border:none;
        font-size: 1em;
        background: $primary-color;
        color: $dark-color1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        &:hover {
            background: white;
            
        }
    }
    .stretch {
        width: 100%;
    }
    .square {
        padding: none;
        aspect-ratio: 1/1;
    }
</style>