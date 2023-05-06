<script lang="ts">
	import SectionSquare from "@/components/squares/SectionSquare.vue";
	import useApp from "@/stores/useApp";
	import useUser from "@/stores/useUser";
	import { defineComponent } from "@vue/runtime-core";

	export default defineComponent({
		components: {
			SectionSquare
		},
		setup() {
			const user = useUser()
			const app = useApp()
			app.title = "Homegrown Records"
			return {
				user
			};
		},
	});
</script>

<template>
	<div class="home">
		<div class="section-container">
			<SectionSquare :image="'/public/vinyl-section.png'">Music</SectionSquare>
			<SectionSquare :image="'/public/equipment-section.png'">Equipment</SectionSquare>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.home {
		.section-container {
			display: flex;
			justify-content: center;
			padding: 30px 0;
			gap: 30px;
			flex-direction: column;
			.section-square {
				width: auto;
				flex-basis: 1;
				flex-shrink: 0;
			}
			@include tablet {
				.section-square {
					width: 25%
				}
				flex-direction: row;
				padding: 150px 0;
			}
			@include desktop {
			}
		}
	}
</style>
