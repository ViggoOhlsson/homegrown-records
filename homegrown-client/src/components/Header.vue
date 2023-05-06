<script lang="ts">
import { defineComponent } from 'vue'
import HeaderNav from './globals/header/HeaderNav.vue';
import HeaderItems from './globals/header/HeaderItems.vue';
import ModalBase from './globals/modal/ModalBase.vue';
import HeaderUser from "@/components/globals/header/HeaderUser.vue"

export default defineComponent({
    components: {
        HeaderNav,
        HeaderItems,
        ModalBase,
        HeaderUser
    },
    setup() {
        
    },
})
</script>

<template>
    <header>
        <p></p>
        <HeaderNav />
        <div class="header-items-container">
            <HeaderItems />
            <HeaderUser />
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100%;
    justify-content: space-between;
    height: 75px;
    background: $dark-color2;
    display: flex;
    p {
        display: none;
    }
    .header-items-container {
        display: flex;
        height: 100%;
    }
    @include desktop {
        p {
            display: inline-block
        }
    }
}

</style>