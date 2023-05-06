<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

<template>
    <div class="dropdown">
        <slot class="item"></slot>
    </div>
</template>

<style lang="scss">
    .dropdown {
        position:absolute;
        display: flex;
        flex-direction: column;
        z-index: 1;
        background: $dark-color3;
        width: 100vw;
        @include desktop {
            // width: auto;
        }
        .item {
            white-space: nowrap;
            font-weight: bold;
            padding: 20px;
            text-decoration: none;
            color: white;
            &:nth-child(even) {
                background: $dark-color2;
            }
        }
    }

</style>