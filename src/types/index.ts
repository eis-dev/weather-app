export interface WeatherStore {
	units: string
	setUnits: (units: string) => void
	isHydrated: boolean
	setIsHydrated: (isHydrated: boolean) => void
}
