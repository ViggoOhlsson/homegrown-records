<script lang="ts" setup>
	import { defineComponent, ref } from "@vue/runtime-core";
	import { RouterLink, RouterView } from "vue-router";
	import Header from "@/components/Header.vue";

    const API_CONN = ref(true)
    setTimeout(() => {
        API_CONN.value = false
    }, Math.floor(Math.random() * 500)) + 300;

</script>

<template>
	<Header></Header>
    <main>
	    <RouterView />
    </main>

    <!-- <span @click="API_CONN = !API_CONN" v-if="!API_CONN" class="api-conn-error-msg"><i class="fa-solid fa-warning"></i> Could not connect to API.</span> -->

</template>

<style lang="scss">
    * {
        box-sizing: border-box;
        font-family: "Quicksand", sans-serif;
    }
    .api-conn-error-msg {
        position: fixed;
        bottom: 20px;
        left: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: rgb(255, 44, 44);
        font-weight: bold;
        padding: 20px;
        background-color: $dark-color2;
        cursor: pointer;
        font-size: 1.5em;

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
