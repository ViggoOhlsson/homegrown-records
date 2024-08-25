<script lang="ts">
import PrimaryButton from '@/components/globals/buttons/PrimaryButton.vue'
import SecondaryButton from '@/components/globals/buttons/SecondaryButton.vue'
import FormRow from '@/components/globals/form/FormRow.vue'
import FormSection from '@/components/globals/form/FormSection.vue'
import TextInput from '@/components/globals/form/TextInput.vue'
import Text from '@/components/globals/text/Text.vue'
import TextTitle from '@/components/globals/text/TextTitle.vue'
import useUserService from '@/services/useUserService'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useUser from "@/stores/useUser"

export default defineComponent({
	components: { FormSection, TextInput, TextTitle, PrimaryButton, FormRow, Text, SecondaryButton },
    setup() {
        const route = useRoute()
        const user = useUser()

        const username = ref("")
        const firstname = ref("")
        const lastname = ref("")
        const email = ref("")
        const password = ref("")
        const confirmPassword = ref("")

        const { register, login } = useUserService()

        const onLogin = async () => {
            try {
                const loginResult = await login({
                    username: username.value,
                    password: password.value,
                })

                user.data = loginResult
            } catch (err) {
                console.error(err)
            } 

        }

        const onRegister = async () => {
            let res = await register({
                username: username.value,
                firstname: firstname.value,
                lastname: lastname.value,
                password: password.value,
                confirmPassword: password.value,
                email: email.value
            })
            console.log(res)
            let loginRes = await login({
                username: username.value,
                password: password.value,
            })
            console.log(loginRes)
        }
        onMounted(() => {
            username.value = ""
            firstname.value = ""
            lastname.value = ""
            email.value = ""
            password.value = ""
            confirmPassword.value = ""
        })

        return {
            onLogin,
            onRegister,
            username,
            firstname,
            lastname,
            email,
            password,
            confirmPassword,

        }
        
    },
})
</script>

<template>
    <div class="account-action">
        <div class="content">
            <div class="form register-container" v-if="$route.meta.action === 'register'">
                <FormSection padding>
                    <TextTitle bold center :em="1.4">Register Account</TextTitle>
                </FormSection>
                <FormSection padding>
                    <TextTitle bold>Username</TextTitle>
                    <TextInput v-model="username" name="homegrown-records-username"></TextInput>
                </FormSection>
                <FormSection padding>
                    <TextTitle bold>Email Adress</TextTitle>
                    <TextInput v-model="email" name="homegrown-records-email"></TextInput>
                </FormSection>
                <FormRow>
                    <FormSection padding>
                        <TextTitle bold>First Name</TextTitle>
                        <TextInput v-model="firstname" name="homegrown-records-firstname"></TextInput>
                    </FormSection>
                    <FormSection padding>
                        <TextTitle bold>Last Name</TextTitle>
                        <TextInput v-model="lastname" name="homegrown-records-lastname"></TextInput>
                    </FormSection>
                </FormRow>
                <FormRow>
                    <FormSection padding>
                        <TextTitle bold>Password</TextTitle>
                        <TextInput type="password" name="homegrown-records-password" v-model="password"></TextInput>
                    </FormSection>
                    <FormSection padding>
                        <TextTitle bold>Confirm Password</TextTitle>
                        <TextInput type="password" name="homegrown-records-confirm-password" v-model="confirmPassword"></TextInput>
                    </FormSection>
                </FormRow>
                <FormSection>
                    <PrimaryButton @click="onRegister">Register</PrimaryButton>
                </FormSection>
                <FormSection :padding="false">
                    <Text dim bold center>Or</Text>
                </FormSection>
                <FormSection>
                    <SecondaryButton @click="() => $router.push({name: 'login'})"> Log In</SecondaryButton>
                </FormSection>
            </div>
            <div class="form login-container" v-if="$route.meta.action === 'login'">
                <FormSection padding>
                    <TextTitle bold center :em="1.4">Log In</TextTitle>
                </FormSection>
                <FormSection padding>
                    <TextTitle bold center>Username / Email Adress</TextTitle>
                    <TextInput v-model="username"></TextInput>
                </FormSection>
                <FormSection padding>
                    <TextTitle bold center>Password</TextTitle>
                    <TextInput type="password" v-model="password"></TextInput>
                </FormSection>
                <FormSection>
                    <PrimaryButton @click="onRegister">Log In</PrimaryButton>
                </FormSection>
                <FormSection :padding="false">
                    <Text dim bold center>Or</Text>
                </FormSection>
                <FormSection>
                    <SecondaryButton @click="() => $router.push({name: 'register'})"> Create Account</SecondaryButton>
                </FormSection>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .account-action {
        margin: 20px 10px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .content {
            width: 500px;
            max-width: 100%;
            align-self: center;
            .form {
                background: $dark-color2;
            }
        }
    }

</style>