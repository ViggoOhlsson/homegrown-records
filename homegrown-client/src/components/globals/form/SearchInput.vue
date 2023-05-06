<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        modelValue: {
            type: String,
            required: true
        },
        placeholder: {
            type:String,
            required: false
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
    <div :class="['input-wrapper', {empty: !$props.modelValue}]">
        <i class="icon fa-solid fa-search"></i>
        <input type="text" class="input" :placeholder="$props.placeholder" @input="onInput" :value="$props.modelValue">
    </div>
</template>

<style lang="scss" scoped>
    .input-wrapper {
        display: flex;
        background: $dark-color1;
        transition: all 0.1s;

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1/1;
            padding: 10px;
        }
        input {
            outline: none;
            border:none;
            padding: 10px 0;
            background: none;
            color: white;
            width: 100%;
            font-size: 1em;
        }
    }
    .empty {
        background-color: $dark-color3;
    }

</style>