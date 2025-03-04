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

export interface WeatherItem {
	dt: number
	main: {
		temp: number
		humidity: number
		temp_min: number
		temp_max: number
	}
	weather: [
		{
			id: number
			main: string
			description: string
			icon: string
		}
	]
	wind: {
		speed: number
	}
	dt_txt: string
}

export interface WeatherDataItem {
	date: string
	title: string
	temp: number
	humidity: number
	windSpeed: number
	icon: string | null
	minTemp: number
	maxTemp: number
}

export interface WeatherData {
	current: WeatherDataItem | null
	forecast: WeatherDataItem[]
}
