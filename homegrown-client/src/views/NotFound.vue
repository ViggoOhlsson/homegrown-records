<script lang="ts">
import Text from '@/components/globals/text/Text.vue'
import TextTitle from '@/components/globals/text/TextTitle.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	components: { TextTitle, Text },
    setup() {
    
    },
})
</script>

<template>
    <div class="container">
        <TextTitle :em="7">'404'</TextTitle>
        <Text :em="2">Page not found</Text>
        <router-link :to="{name: 'home'}"><i class="fa-solid fa-arrow-left"></i> Home </router-link>
    </div>
</template>

<style lang="scss">
    .container {
        align-self: center;
        flex-grow: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        a {
            font-size: 1.5em;
            font-weight: bold;
            color: $primary-color;
            text-decoration: none;
            animation: oscillate 2s ease-in-out none infinite;
        }
    }
    @keyframes oscillate {
        0% {
            scale: 1;
        }
        50% {
            scale: 1.3;
        }
        100% {
            scale: 1;
        }
    }
</style>