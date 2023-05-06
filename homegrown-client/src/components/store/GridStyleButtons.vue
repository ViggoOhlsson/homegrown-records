<script lang="ts">
import { defineComponent } from 'vue'
import PrimaryButton from "@/components/globals/buttons/PrimaryButton.vue"
import SecondaryButton from "@/components/globals/buttons/SecondaryButton.vue"

export default defineComponent({
    components: {
        SecondaryButton,
        PrimaryButton
    },
    props: {
        modelValue: {
            type:Number,
            required:true
        }
    },
    emits: [
        'update:modelValue'
    ],
    setup(props, { emit }) {
        
    },
})
</script>

<template>
    <div class="grid-style-buttons">
        <component @click="$emit('update:modelValue', 1)" square :is="$props.modelValue === 1 ? 'primary-button' : 'secondary-button'">
            <i class="fa-regular fa-square"></i>
        </component>
        <component @click="$emit('update:modelValue', 2)" square :is="$props.modelValue === 2 ? 'primary-button' : 'secondary-button'">
            <i class="fa-solid fa-border-all"></i>
        </component>
    </div>    
</template>

<style lang="scss" scoped>
.grid-style-buttons {
    align-self: flex-end;
    display: flex; 
}

</style>