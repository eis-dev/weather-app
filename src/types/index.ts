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

export interface WeatherData {
	dt: number
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		sea_level: number
		grnd_level: number
		humidity: number
		temp_kf: number
	}
	weather: {
		id: number
		main: string
		description: string
		icon: string
	}[]
	clouds: {
		all: number
	}
	wind: {
		speed: number
		deg: number
		gust: number
	}
	visibility: number
	pop: number
	rain?: {
		"3h": number
	}
	sys: {
		pod: string
	}
	dt_txt: string
}
