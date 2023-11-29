<template>
	<q-select
		class="tw-min-w-[20rem]"
		:label="label"
		use-input
		input-debounce="0"
		clearable
		clear-icon="close"
		dense
		outlined
		bg-color="white"
		hide-bottom-space
		hide-dropdown-icon
		option-label="city"
		option-value="iata"
		emit-value
		map-options
		:options="filteredAirports"
		:model-value="airport"
		@filter="onFilter"
		@update:model-value="onUpdate"
	>
		<template #prepend>
			<q-icon
				color="black"
				name="mdi-airplane-takeoff"
			/>
		</template>
		<template #option="{opt, itemProps}">
			<q-item
				class="tw-px-0 tw-group"
				v-bind="itemProps"
				dense
			>
				<div class="tw-flex tw-items-center">
					<div class="tw-w-0.5 group-hover:tw-bg-primary tw-h-full" />
					<div class="tw-flex tw-items-center tw-px-3 tw-gap-3 tw-py-4">
						<div>
							<q-icon
								name="flight"
								size="20px"
							/>
						</div>
						<div class="tw-flex-grow">
							<div class="tw-flex tw-items-center tw-gap-2">
								<span>{{ opt['city'] }}</span>
								<span class="tw-w-1 tw-h-1 tw-rounded-full tw-bg-primary" />
								<span>{{ opt['iata'] }}</span>
							</div>
							<div class="tw-text-sm tw-text-gray-600">
								{{ opt['country'] }}
							</div>
						</div>
					</div>
				</div>
			</q-item>
		</template>
	</q-select>
</template>
<script lang="ts">
import { computed, onMounted, reactive, ref, Ref } from 'vue'
import { api } from 'boot/axios'
import { Airport } from 'src/types/Airport'

export default {
	props: {
		airport: {
			required: true,
			type: [String, null]
		},
		label: {
			required: false,
			type: String,
			default: 'Select airport'
		},
		exclude: {
			required: false,
			type: Array,
			default: () => ([])
		}
	},
	emits: ['update:airport'],
	setup (props:Record<string, string | string[] | null>, { emit } : {emit:CallableFunction}) {
		const airports: Airport[] = reactive([])
		const search: string | Ref = ref(null)
		onMounted(() => {
			api.get('airports').then(({ data }) => {
				airports.push(...data.airports)
			})
		})

		const filteredAirports = computed(() => {
			return airports.filter((a) => {
				return (!search.value ||
					a.city.toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
					a.country.toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
					a.iata.toLowerCase().indexOf(search.value.toLowerCase()) > -1) &&
					(!props.exclude || !props.exclude.includes(a.iata))
			})
		})

		const onFilter = (val: string, update: CallableFunction) => {
			search.value = val
			update()
		}

		const onUpdate = (value: string) => {
			console.log({ value })
			emit('update:airport', value)
		}
		return { filteredAirports, onFilter, onUpdate }
	}
}

</script>

<style scoped>

</style>
