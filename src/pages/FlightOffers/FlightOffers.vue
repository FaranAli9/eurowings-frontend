<template>
	<div class="tw-space-y-10">
		<q-card>
			<q-card-section class="tw-space-y-4">
				<div class="tw-grid md:tw-grid-cols-2 tw-gap-5">
					<AirportSelector
						v-model:airport="filters.origin"
						:exclude="[filters.destination]"
						label="Departure airport"
					/>
					<AirportSelector
						v-model:airport="filters.destination"
						:exclude="[filters.origin]"
						label="Destination airport"
					/>
				</div>
				<div class="tw-grid md:tw-grid-cols-3 tw-gap-5">
					<DateRangeSelector
						v-model:date="filters.departureDate"
						:origin="filters.origin"
						:destination="filters.destination"
					/>
					<DateRangeSelector
						v-model:date="filters.returnDate"
						:min="filters.departureDate"
						:origin="filters.destination"
						:destination="filters.origin"
					/>
					<q-btn
						color="primary"
						class="tw-w-full"
						@click="activateFilters"
					>
						Search
					</q-btn>
				</div>
			</q-card-section>
		</q-card>
		<div
			v-if="activeFilters.origin && activeFilters.destination && activeFilters.departureDate"
			class="tw-w-60"
		>
			<SortSelector v-model:sort="sortBy" />
		</div>
		<FlightList
			label="Outgoing flights"
			:departure-date="activeFilters.departureDate"
			:origin="activeFilters.origin"
			:destination="activeFilters.destination"
			:sort="sortBy"
		/>

		<FlightList
			label="Return flights"
			:departure-date="activeFilters.returnDate"
			:origin="activeFilters.destination"
			:destination="activeFilters.origin"
			:sort="sortBy"
		/>
	</div>
</template>
<script lang="ts">

import AirportSelector from 'pages/FlightOffers/components/AirportSelector.vue'
import { reactive, ref } from 'vue'
import FlightList from 'pages/FlightOffers/components/FlightList.vue'
import DateRangeSelector from 'pages/FlightOffers/components/DateRangeSelector.vue'
import { api } from 'boot/axios'
import { useOffersStore } from 'stores/modules/offers'
import SortSelector from 'pages/FlightOffers/components/SortSelector.vue'

export interface IFilters {
	origin: string | null
	destination:string | null
	departureDate: string | null
	returnDate: string | null
}

const _filters:IFilters = {
	origin: null,
	destination: null,
	departureDate: null,
	returnDate: null
}

const offersStore = useOffersStore()
export default {
	components: { SortSelector, DateRangeSelector, FlightList, AirportSelector },
	setup () {
		const filters: IFilters = reactive({ ..._filters })
		const activeFilters: IFilters = reactive({ ..._filters })
		const sortBy = ref(null)

		api.get('offers').then(({ data }) => {
			offersStore.set(data.offers)
		})
		const activateFilters = () => {
			Object.keys(filters).forEach((key:string) => {
				activeFilters[key as keyof IFilters] = filters[key as keyof IFilters]
			})
		}
		return { filters, activeFilters, sortBy, activateFilters }
	}
}

</script>
