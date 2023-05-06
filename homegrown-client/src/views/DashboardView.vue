<script lang="ts">
	import Loader from "@/components/globals/misc/Loader.vue";
	import useUser from "@/stores/useUser";
	import { defineComponent, onMounted } from "@vue/runtime-core";
	import Text from "@/components/globals/text/Text.vue";
	import TextTitle from "@/components/globals/text/TextTitle.vue";
	import PrimaryButton from "@/components/globals/buttons/PrimaryButton.vue";
	import useUserService from "@/services/useUserService";
	import AdminSection from "@/components/admin/AdminSection.vue";
	import CartItemList from "@/components/cart/CartItemList.vue";
	import Wishlist from "@/components/misc/Wishlist.vue";
	import { useRouter } from "vue-router";
	import { storeToRefs } from "pinia";
	import useApp from "@/stores/useApp";
	import FormRow from "@/components/globals/form/FormRow.vue"
	import SecondaryButton from "@/components/globals/buttons/SecondaryButton.vue";

	export default defineComponent({
		components: {
			Loader,
			TextTitle,
			Text,
			PrimaryButton,
			CartItemList,
			Wishlist,
			AdminSection,
			FormRow,
			SecondaryButton

		},
		setup() {
			const user = useUser()
			const router = useRouter()
			const {logout} = useUserService()
			const app = useApp()
			const onLogout = async () => {
				await logout()
				window.location.href = import.meta.env.VITE_URL
			}

			onMounted(() => {
				setTimeout(() => {
					if (!user.data) router.push({name: "home"})
				}, 1500);
			})
			return {
				user,
				app,
				onLogout
			};
		},
	});
</script>

<template>
	<div class="dashboard" v-if="user.data">
		<section class="image-section">
			<div class="profile-picture">
				<img :src="user.data.profile_picture_url" :alt="user.data.username + ' - ' + user.data.fullname">
			</div>
			<TextTitle bold :em="1.1">{{user.data.username}}</TextTitle>
			<Text bold dim :em="0.9">{{user.data.fullname}}</Text>
			<Text dim :em="0.9">{{user.data._id}}</Text>
		</section>
		<section class="settings-section">
			<FormRow>
				<PrimaryButton v-if="app.currency === 'USD'">USD $</PrimaryButton>
				<SecondaryButton v-if="app.currency === 'SEK'" @click="app.currency = 'USD'">USD $</SecondaryButton>
				<PrimaryButton v-if="app.currency === 'SEK'">SEK kr</PrimaryButton>
				<SecondaryButton v-if="app.currency === 'USD'" @click="app.currency = 'SEK'">SEK kr</SecondaryButton>
			</FormRow>
			<PrimaryButton @click="onLogout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</PrimaryButton>
		</section>
		<section class="admin-section" v-if="user.data.isAdmin">
			<TextTitle bold :em="1.4">Admin</TextTitle>
			<AdminSection></AdminSection>
		</section>
		<section class="wishlist-section">
			<TextTitle bold :em="1.4"><i class=""></i> My Wishlist</TextTitle>
			<Wishlist></Wishlist>
		</section>
	</div>
	<Loader fixed v-else></Loader>
</template>

<style lang="scss" scoped>
	.dashboard {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 20px;
		padding: 20px 10px;
		@include desktop {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		section {
			background: $dark-color2;
			padding: 20px;
		}
		.settings-section {
			display: flex;
			flex-direction: column;
			gap: 10px;
			@include tablet {
				flex-direction: row;

			}
			@include desktop {
				flex-direction: column;

			}
		}
		.image-section {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex-wrap: wrap;
			gap: 10px;
			grid-column: 1/-1;
			@include desktop {
				grid-column: 1/3;
				align-items: flex-start;
			}
			.profile-picture {
				width: 250px;
				max-width: 100%;
				img {
					width: 100%;
					border-radius: 50%;

				}
			}
		}
		.admin-section {
			display: flex;
			flex-direction: column;
			gap: 20px;
			grid-column:  1/-1;
			@include desktop {
				grid-column: 1/3;
			}
		}
		.wishlist-section {
			grid-column: 1/-1;
			@include desktop {
				grid-column: 1/3;
			}
		}

	}
</style>
