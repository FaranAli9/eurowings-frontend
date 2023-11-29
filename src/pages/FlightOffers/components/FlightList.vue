<template>
	<q-card v-if="showFlights">
		<q-card-section>
			<div class="tw-space-y-10">
				<h1 class="tw-text-3xl tw-font-medium">
					{{ label }}
				</h1>
				<div
					v-if="filteredOffers.length"
					class="tw-flex tw-flex-col tw-gap-4"
				>
					<FlightListItem
						v-for="offer in filteredOffers"
						:key="offer.id"
						:offer="offer"
					/>
				</div>
				<div
					v-else
					class="tw-px-3 tw-py-3 tw-bg-orange-300 tw-text-orange-700"
				>
					No flights available
				</div>
			</div>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FlightListItem from 'pages/FlightOffers/components/FlightListItem.vue'
import { useOffersStore } from 'stores/modules/offers'
import dayjs from 'dayjs'

const offersStore = useOffersStore()
const props = defineProps<{
	label: string
	origin: string | null,
	destination: string | null,
	departureDate: string | null,
	sort: string | null
}>()

const showFlights = computed(() => {
	const { origin, destination, departureDate } = props
	return !!origin && !!destination && !!departureDate
})

const offers = computed(() => offersStore.list)
const filteredOffers = computed(() => {
	return offers.value.filter(o => (
		showFlights.value &&
		o.origin === props.origin &&
		o.destination === props.destination &&
		o.departureDate === props.departureDate
	)).sort((a, b) => {
		if (props.sort === 'price') {
			return a.price.amount - b.price.amount
		}
		else {
			return dayjs(a.departureDate, 'YYYY/MM/DD').isBefore(dayjs(b.departureDate, 'YYYY/MM/DD')) ? -1 : 1
		}
	})
})
</script>
