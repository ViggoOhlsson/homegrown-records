<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        padding: {
            type:Boolean,
            required: false,
            default: false,
        }
    },
    setup() {
        
    },
})
</script>

<template>
    <div :class="['form-row', {padding: $props.padding}]">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .padding {
        padding: 10px;
    }
</style>