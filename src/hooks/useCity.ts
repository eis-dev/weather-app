import { Geoname } from "@/types"

import { useWeatherStore } from "@/store"

export const useCity = () => {
	const city = useWeatherStore((state) => state.city)
	const setCity = useWeatherStore((state) => state.setCity)
	const cityHistory = useWeatherStore((state) => state.cityHistory)
	const setCityHistory = useWeatherStore((state) => state.setCityHistory)

	const selectCity = (geoname: Geoname) => {
		const mappedGeoname = {
			geonameId: geoname.geonameId,
			name: geoname.name,
			countryName: geoname.countryName,
			lat: geoname.lat,
			lon: geoname.lng || geoname.lon
		}

		setCity(mappedGeoname)

		setCityHistory(
			[
				mappedGeoname,
				...cityHistory.filter((c) => c.geonameId !== mappedGeoname?.geonameId)
			].slice(0, 5)
		)
	}

	return { selectCity, city, cityHistory }
}
