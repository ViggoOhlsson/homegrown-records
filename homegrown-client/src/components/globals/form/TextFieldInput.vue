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
        rows: {
            type:Number,
            default: 3
        },
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
    <textarea :class="['text-input', {empty: !$props.modelValue}]" type="text" :name="$props.name" @input="onInput" :value="$props.modelValue" :placeholder="$props.placeholder" cols="1" :rows="$props.rows"></textarea>
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
        resize: none;
    }
    .empty {
        background: $dark-color3;
    }
</style>