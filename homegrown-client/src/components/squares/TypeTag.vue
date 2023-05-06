<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        type: {
            type:String,
            required: true
        },
    },
    setup() {
        
    },
})
</script>

<template>
    <span :class="['type-tag', $props.type.toLowerCase()]">{{$props.type}}</span>
</template>

<style lang="scss" scoped>
    .type-tag {
        padding: 1px 5px;
        font-size: 0.85em;
        font-weight: bold;
        border-radius: 2px;
        color: $dark-color1
    }
    .vinyl {
        background: rgb(180, 45, 27);
    }
    .EP {
        background: rgb(27, 180, 104);
    }
    .cd {
        background: rgb(247, 243, 60);
    }
    .hardware {
        background: rgb(255, 255, 255);
    }

</style>