<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type:String,
            required: false
        },
        modelValue: {
            type:Number,
            required: true
        },
        placeholder: {
            type:String,
            required: false
        },
    },
    emits: [
        'update:modelValue'
    ],
    setup(props, {emit}) {   
        const onInput = (e:Event) => emit("update:modelValue", (e.target as HTMLInputElement).valueAsNumber)
        return {
            onInput
        }    
    },
})
</script>

<template>
    <input :class="['number-input', {empty: !$props.modelValue}]"  type="number" :name="$props.name" @input="onInput" :value="$props.modelValue" :placeholder="$props.placeholder">
</template>

<style lang="scss" scoped>
    .number-input {
        padding: 10px;
        background: $dark-color1;
        border: none;
        color: white;
        font-size: 1em;
        display: block;
        transition: background-color 0.1s;
        width: 100%;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
    }
    }
    .empty {
        background: $dark-color3;
    }
</style>