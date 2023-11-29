<template>
	<q-layout view="lHh Lpr lFf">
		<q-header
			elevated
			class="tw-bg-white"
		>
			<div class="tw-p-3">
				<q-img
					class="tw-w-40"
					src="src/assets/logo.svg"
				/>
			</div>
		</q-header>

		<q-page-container>
			<q-page
				padding
				class="tw-bg-gray-50"
			>
				<router-view />
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'MainLayout',
	setup () {
		const leftDrawerOpen = ref(false)

		return {
			leftDrawerOpen
		}
	}
})
</script>
