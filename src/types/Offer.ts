export interface Offer {
	id: bigint
	origin: string
	destination: string
	departureDate: string
	seatAvailability: number
	price: {
		amount: number
		currency: string
	}
}
