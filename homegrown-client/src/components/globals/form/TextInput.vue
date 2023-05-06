<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type:String,
            required: false
        },
        modelValue: {
            type:String,
            required: true
        },
        placeholder: {
            type:String,
            required: false
        },
        type: {
            type:String,
            default: "text"
        }
    },
    emits: [
        'update:modelValue'
    ],
    setup(props, {emit}) {
        const onInput = (e:Event) => emit("update:modelValue", (e.target as HTMLInputElement).value)
        
        return {
            onInput
        }
        
    },
})
</script>

<template>
    <input :class="['text-input', {empty: !$props.modelValue}]" :type="type" :name="$props.name" @input="onInput" :value="$props.modelValue" :placeholder="$props.placeholder" size="1">
</template>

<style lang="scss" scoped>
    .text-input {
        padding: 10px;
        background: $dark-color1;
        border: none;
        color: white;
        font-size: 1em;
        display: block;
        transition: background-color 0.1s;
        min-width: none;
    }
    .empty {
        background: $dark-color3;
    }
</style>