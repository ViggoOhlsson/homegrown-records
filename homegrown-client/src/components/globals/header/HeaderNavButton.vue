<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
interface ITo {
    name:String
    query?: Object
    params?: Object
}

export default defineComponent({
    props: {
        to: {
            required: true,
            type: Object as PropType<RouteLocationRaw>
        }
    },
    setup() {
        
    },
})
</script>

<template>
    <router-link :to="$props.to">
        <slot></slot>
    </router-link>
</template>

<style lang="scss" scoped>
    a {
        padding: 0 20px;
        display: flex;
        align-items: center;
        color:white;
        font-weight: bold;
        text-decoration: none;    
        &:hover {
            background: $primary-color;
            color: $dark-color2;
        }
    }

</style>