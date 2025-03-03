export interface WeatherStore {
	units: string
	city: Geoname | null
	cityHistory: Geoname[]
	setUnits: (units: string) => void
	setCity: (city: Geoname) => void
	setCityHistory: (cityHistory: Geoname[]) => void
	isHydrated: boolean
	setIsHydrated: (isHydrated: boolean) => void
}

export interface Geoname {
	geonameId: number
	name: string
	countryName: string
	lat: number
	lon?: number | undefined
	lng?: number | undefined
}
