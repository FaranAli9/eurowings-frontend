<template>
	<div class="tw-flex tw-shadow-md tw-px-3 tw-py-2">
		<div class="tw-flex-grow tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-gap-2 md:tw-gap-20">
			<div class="tw-flex tw-gap-2 tw-items-end tw-text-dark-primary">
				<div>
					<h4 class="tw-leading-none">
						{{ offer.origin }}
					</h4>
					<div><span class="tw-text-lg md:tw-text-2xl tw-font-semibold">06:45</span><span class="tw-text-xs">AM</span></div>
				</div>
				<div>
					<q-icon
						name="mdi-transit-connection-horizontal"
						size="24px"
						class="tw-mb-0.5"
					/>
				</div>
				<div>
					<h4 class="tw-leading-none">
						{{ offer.destination }}
					</h4>
					<div><span class="tw-text-lg md:tw-text-2xl tw-font-semibold">07:55</span><span class="tw-text-xs">AM</span></div>
				</div>
			</div>
			<div class="tw-flex tw-items-center tw-gap-20">
				<div class="">
					<div class="tw-hidden md:tw-block">
						Travel time
					</div>
					<div class="tw-font-medium md:tw-text-lg">
						01:10h
					</div>
				</div>
				<div class="">
					<div class="tw-hidden md:tw-block">
						Flight connection
					</div>
					<div class="tw-font-medium md:tw-text-lg">
						Nonstop
					</div>
				</div>
			</div>
			<div
				v-if="offer.seatAvailability < 20"
				class="md:tw-flex md:tw-flex-col md:tw-items-center md:tw-justify-center"
			>
				<span class="tw-border tw-border-orange-300 tw-text-orange-700 tw-rounded tw-px-2 tw-py-1">
					Only {{ offer.seatAvailability }} seats left <span class="tw-text-dark-primary tw-text-xs">**</span>
				</span>
			</div>
		</div>
		<div class="">
			<div class="tw-text-right">
				Flight from:
			</div>
			<div class="tw-text-xl md:tw-text-4xl tw-font-medium">
				<span>{{ currencies[offer.price.currency] }}</span>{{ offer.price.amount }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Offer } from 'src/types/Offer'
import { currencies } from 'src/types/Currencies'

defineProps<{
	offer: Offer
}>()

</script>
