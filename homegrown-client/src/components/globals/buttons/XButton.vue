<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

<template>
    <button>
        <i class="fa-solid fa-close"></i>
    </button>
</template>

<style lang="scss" scoped>
    button {
        color:white;
        background: none;
        border: none;
        cursor: pointer;
        width: 50px;
        box-sizing: border-box;
        aspect-ratio: 1/1;
        &:hover {
            background-color: $primary-color;
            color: $dark-color1
        }
    }
    i {
        font-size: 1.4em;
    }
</style>