import { Geoname } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { useWeatherStore } from "@/store"

const fetchWeather = async (city: Geoname, units: string) => {
	const res = await fetch(
		`/api/weather?lat=${city.lat}&lon=${city.lon}&units=${units}`
	)

	if (!res.ok) {
		throw new Error((await res.json())?.error || "An error occurred")
	}

	return res.json()
}

export const useWeather = () => {
	const city = useWeatherStore((state) => state.city)
	const units = useWeatherStore((state) => state.units)

	return useQuery({
		queryKey: ["weather", city?.geonameId, units],
		queryFn: () => fetchWeather(city!, units),
		enabled: !!city,
		staleTime: 100000,
		retry: 0
	})
}
