<script lang="ts">
import { defineComponent } from 'vue'
import TextTitle from '../text/TextTitle.vue'

export default defineComponent({
    components: {
        TextTitle
    },
    props: {
        fixed: 
        {
            type:Boolean,
            required:false,
        }
    },
    setup() {
        
    },
})
</script>

<template>
    <div :class="['loader', {fixed: $props.fixed}]">
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <TextTitle bold>Loading...</TextTitle>
    </div>
    
</template>

<style lang="scss" scoped>
    .fixed {
        position: fixed;
        top: 50%;
        left: 50%;
        translate: -50% -50%;

    }
    .loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        color: $primary-color;
        i {
            font-size: 2em;

        }
    }
</style>