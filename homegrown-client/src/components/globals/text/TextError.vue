<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        bold: {
            type:Boolean,
            required: false
        },
        ellipsis: {
            type:Boolean,
            required: false
        },
        dim: {
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
    <span :class="{bold: $props.bold, ellipsis: $props.ellipsis, dim: $props.dim, center: $props.center}"><slot></slot></span>    
</template>

<style lang="scss" scoped>
    span {
        font-size: v-bind(em);
    }
    .bold {
        display: block;
        font-weight: bold;
    }
    .dim {
        color: rgb(150, 150, 150);
    }
    .center {
        display: block;
        text-align: center;
    }
    .ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>