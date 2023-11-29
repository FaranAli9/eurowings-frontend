<template>
	<q-input
		dense
		outlined
		:model-value="props.date"
		clearable
		clear-icon="close"
		:disable="!origin || !destination || !min"
		mask="date"
		class="tw-min-w-full"
		@clear="$emit('update:date', null)"
	>
		<template #append>
			<q-icon
				name="event"
				class="cursor-pointer"
			>
				<q-popup-proxy
					ref="dateRef"
					cover
					transition-show="scale"
					transition-hide="scale"
				>
					<q-date
						:model-value="props.date"
						:options="dateFilter"
						@update:model-value="(v) => $emit('update:date', v)"
					>
						<div class="row items-center justify-end">
							<q-btn
								v-close-popup
								label="Close"
								color="primary"
								flat
							/>
						</div>
					</q-date>
				</q-popup-proxy>
			</q-icon>
		</template>
	</q-input>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { useOffersStore } from 'stores/modules/offers'
const offersStore = useOffersStore()
defineEmits(['update:date'])
const props = withDefaults(defineProps<{
	date: string | null
	min?: string | null
	origin: string | null
	destination: string | null
}>(), {
	min: dayjs().subtract(1, 'day').format('YYYY/MM/DD')
})
const dateRef = ref(null)
const offers = computed(() => offersStore.list)

const dateFilter = (value: string) => {
	const min = dayjs(props.min, 'YYYY/MM/DD').subtract(1, 'day')
	const date = dayjs(value, 'YYYY/MM/DD')
	return offers.value.filter(o => o.departureDate === value && o.origin === props.origin && o.destination === props.destination).length > 0 &&
		date.isAfter(min) &&
		date.isBefore(dayjs().add(3, 'months'))
}
</script>
