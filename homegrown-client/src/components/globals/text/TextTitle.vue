<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        bold: {
            type:Boolean,
            required: false
        },
        center: {
            type:Boolean,
            required:false
        },
        em: {
            type:Number,
            required: false,
            default: 1
        }
    },
    setup(props) {
        return {
            em: `${props.em}em`
        }
    },
})
</script>

<template>
    <span :class="[{bold: $props.bold}, {center: $props.center}]"><slot></slot></span>    
</template>

<style lang="scss" scoped>
    span {
        color: $primary-color;
        font-size: v-bind(em);
    }
    .bold {
        font-weight: bold;
    }
    .center {
        display: block;
        text-align: center;
    }
</style>