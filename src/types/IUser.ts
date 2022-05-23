enum CountryEnum {
	ukraine = 'Ukraine',
	england = 'England',
	france = 'France',
}

export interface IUser {
	id: number
	name: string
	company: string
	additional?: string
	street?: string
	postalCode?: string
	country?: CountryEnum
	iBan: string
	bic: string
	bankName: string
	fax?: number
	email?: string
	birthday?: string
	homepage?: string
}
