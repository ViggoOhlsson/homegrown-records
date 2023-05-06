<script lang="ts">
	import { defineComponent, ref } from "@vue/runtime-core";
	import { RouterLink, RouterView } from "vue-router";
	import Header from "@/components/Header.vue";

	export default defineComponent({
        components: {
            Header
        },
		setup() {

            
        },
	});
</script>

<template>
	<Header></Header>
    <main>
	    <RouterView />
    </main>
</template>

<style lang="scss">
    * {
        box-sizing: border-box;
        font-family: "Quicksand", sans-serif;
    }
    body {
        margin: 0;
        background: $dark-color1;
        color: white;
        font-size: 11pt;
    }
    #app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        main {
            margin: 0 10px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            @include desktop {
                width: 75%;
                align-self: center;
            }
        }
    }
    
	::-webkit-scrollbar {
	width: 15px;
	}
	::-webkit-scrollbar-track {
	background: black;
	}
	::-webkit-scrollbar-thumb {
	background: $dark-color3;
	}
	::-webkit-scrollbar-thumb:hover {
	background: $primary-color;
	}
</style>
