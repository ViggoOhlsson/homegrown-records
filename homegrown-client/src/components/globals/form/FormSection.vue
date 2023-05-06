<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        padding: {
            type:Boolean,
            required: false,
            default: true,
        }
    },
    setup() {
        
    },
})
</script>

<template>
    <div :class="['form-section', {padding: $props.padding}]">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .form-section {
        display: flex;
        gap: 10px;
        flex-direction: column;
        justify-content: space-between;
    }
    .padding {
        padding: 10px;
    }
</style>