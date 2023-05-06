<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        square: {
            type:Boolean,
            required:false
        }
    },
    setup(props, { emit }) {
        
        
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
        background: none;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        &:hover {
            color: $primary-color;
            background: rgba($color: #ffffff, $alpha: 0.1);
        }
    }
    .square {
        padding: none;
        aspect-ratio: 1/1;
    }
</style>