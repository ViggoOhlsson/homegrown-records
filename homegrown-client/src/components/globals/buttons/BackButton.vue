<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        preventDefault: {
            required: false,
            default: false,
            type: Boolean
        }
    },
    setup() {
        
    },
})
</script>

<template>
    <button class="back-button" @click="!$props.preventDefault && $router.back()">
        <i class="fa-solid fa-arrow-left"></i> Back
    </button>
</template>

<style lang="scss" scoped>
    .back-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 10px;
        font-weight: bold;
        background: none;
        border:none;
        color: white;
        font-size: 1em;
        aspect-ratio: 1/1;
        height: 40px;
        cursor: pointer;
        &:hover {
        color: $primary-color;
            background: rgba($color: #FFF, $alpha: 0.05);
        }
    }
</style>