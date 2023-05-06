<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HeaderNavButton from "@/components/globals/header/HeaderNavButton.vue"
import SecondaryButton from '../buttons/SecondaryButton.vue'
import HeaderButton from './HeaderButton.vue'
import Dropdown from '../dropdown/Dropdown.vue'
import Text from '@/components/globals/text/Text.vue'

export default defineComponent({
    components: {
        HeaderNavButton,
        HeaderButton,
        Dropdown,
        Text
    },
    setup() {
        const showDropdown = ref(false)
        const toggleDropdown = () => showDropdown.value = !showDropdown.value

        return {
            showDropdown,
            toggleDropdown
        }
    },
})
</script>

<template>
    <nav class="desktop">
        <HeaderNavButton :to="{name: 'home'}">Home</HeaderNavButton>
        <HeaderNavButton :to="{name: 'store'}">Store</HeaderNavButton>
        <HeaderNavButton :to="{name: 'about'}">About</HeaderNavButton>
        <HeaderNavButton :to="{name: 'contact'}">Contact</HeaderNavButton>
    </nav>
    <div class="mobile">
        <HeaderButton @click="toggleDropdown"><i class="fa-solid fa-bars"></i></HeaderButton>
        <transition name="roll-in">
            <Dropdown v-if="showDropdown">
                <router-link @click="toggleDropdown" :to="{name: 'home'}" class="item"><i class="fa-solid fa-home"></i> Home</router-link>
                <router-link @click="toggleDropdown" :to="{name: 'store'}" class="item"><i class="fa-solid fa-store"></i> Store</router-link>
                <router-link @click="toggleDropdown" :to="{name: 'about'}" class="item"><i class="fa-solid fa-info-circle"></i> About</router-link>
                <router-link @click="toggleDropdown" :to="{name: 'contact'}" class="item"><i class="fa-solid fa-phone"></i> Contact</router-link>
            </Dropdown>
        </transition>
    </div>
</template>

<style lang="scss">
    .desktop {
        display: none;
    }
    .mobile {
        display: block;
        position: relative;
    }
    @include desktop {
        .desktop {
            display: flex;
        }
        .mobile {
            display: none;
        }
    }
    
    .roll-in {
        &-enter-from, &-leave-to {
            translate: -100% ;
        }
        &-enter-active, &-leave-active {
            transition: all 0.2s;
        }
    }

</style>