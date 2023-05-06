<script lang="ts">
import useUser from '@/stores/useUser'
import { defineComponent, ref } from 'vue'
import PrimaryButton from '../buttons/PrimaryButton.vue'
import SecondaryButton from '../buttons/SecondaryButton.vue'
import Dropdown from '../dropdown/Dropdown.vue'
import Text from '../text/Text.vue'
import TextTitle from '../text/TextTitle.vue'

export default defineComponent({
	components: { TextTitle, Text, Dropdown, PrimaryButton, SecondaryButton },
    setup() {
        const user = useUser()
        const showDropdown = ref(false)
        
        return {
            user,
            showDropdown
        }
    },
})
</script>

<template>
    <router-link :to="{name: 'dashboard'}" class="user" v-if="user.data">
        <div class="data">
            <TextTitle bold>{{user.data.username}} </TextTitle>
            <Text bold dim v-if="user.data.isAdmin">Administrator</Text>
            <Text><i class="fa-solid fa-coins"></i> {{user.data.credits}}</Text>
        </div>
        <div class="profile-picture" >
            <img :src="user.data.profile_picture_url" :alt="user.data.fullname">
        </div>
    </router-link>
    <div v-else class="login-wrapper">
        <router-link :to="{name: 'login'}"><TextTitle bold>Log In</TextTitle></router-link>
        <Text dim>or</Text>
        <router-link :to="{name: 'register'}"><Text bold>Register</Text></router-link>
    </div>
</template>

<style lang="scss">
    .login-wrapper {
        font-size: 1.1em;
        padding: 0 20px;
        height: 100%;
        display: flex;
        gap: 10px;
        align-items: center;
        a {
            color: white;
            text-decoration: none;
        }
    }
    .user {
        display: flex;
        height: 100%;
        padding: 0 0 0 10px;
        position:relative;
        color: white;
        text-decoration: none;
        &:hover {
            background: $dark-color3;
        }
        .data {
            font-size: 0.9em;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            // text-align: right;
            gap: 2px;
        }
        .profile-picture {
            height: 100%;
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                border-radius: 50%;
                height: 75%;
            }
        }
        .dropdown {
            bottom: 0;
            right: 0;
            translate: 0 100%;
        }
    }

</style>