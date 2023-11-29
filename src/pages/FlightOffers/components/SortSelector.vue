<template>
	<q-select
		:model-value="sort"
		label="Sorted by"
		emit-value
		map-options
		outlined
		dense
		rounded
		:options="options"
		@update:model-value="v => $emit('update:sort', v)"
	>
		<template #prepend>
			<q-icon name="mdi-swap-vertical" />
		</template>
		<template #option="{opt, itemProps}">
			<q-item v-bind="itemProps">
				<div>
					<div>{{ opt['label'] }}</div>
					<div class="tw-text-dark-secondary">
						{{ opt['caption'] }}
					</div>
				</div>
			</q-item>
		</template>
	</q-select>
</template>
<script setup lang="ts">

defineProps<{
	sort: string | null
}>()

defineEmits(['update:sort'])

const options: {label: string, value: string, caption: string}[] = [
	{ label: 'Departure time', value: 'departureDate', caption: 'early-late' },
	{ label: 'Price', value: 'price', caption: 'cheapest first' }
]
</script>
