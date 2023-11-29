import { defineStore } from 'pinia'
import { Offer } from 'src/types/Offer'

interface State {
	list: Offer[]
}
export const useOffersStore = defineStore('offers', {
	state: (): State => ({
		list: []
	}),
	actions: {
		set (offers: Offer[]) {
			this.list = offers
		}
	}
})
