import { useMemo } from "react"

import { useWeatherStore } from "@/store"
import { useQuery } from "@tanstack/react-query"

import { Geoname, WeatherData, WeatherItem } from "@/types"

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

	const { data, isLoading } = useQuery({
		queryKey: ["weather", city?.geonameId, units],
		queryFn: () => fetchWeather(city!, units),
		enabled: !!city,
		staleTime: 100000,
		retry: 0
	})

	const mappedData = useMemo(() => {
		if (!data || !data.list || data.list.length === 0) {
			return { current: null, forecast: [] }
		}

		const currentItem = data.list[0]
		const forecast: WeatherData["forecast"] = []
		const dailyData: { [key: string]: WeatherItem[] } = {}

		data.list.forEach((item: WeatherItem) => {
			const date = item.dt_txt.split(" ")[0]
			if (!dailyData[date]) {
				dailyData[date] = []
			}
			dailyData[date].push(item)
		})

		Object.keys(dailyData).forEach((date) => {
			const dayData = dailyData[date]

			const lastDataPoint = dayData[dayData.length - 1]
			if (!lastDataPoint.dt_txt.endsWith("21:00:00")) {
				return
			}

			let tempSum = 0
			let humiditySum = 0
			let windSpeedSum = 0
			const iconCounts: { [key: string]: number } = {}
			let dominantIcon: string | null = null
			let maxIconCount = 0
			let minTemp = Infinity
			let maxTemp = -Infinity

			dayData.forEach((item) => {
				tempSum += item.main.temp
				humiditySum += item.main.humidity
				windSpeedSum += item.wind.speed

				const icon = item.weather[0].icon
				iconCounts[icon] = (iconCounts[icon] || 0) + 1

				if (iconCounts[icon] > maxIconCount) {
					maxIconCount = iconCounts[icon]
					dominantIcon = icon
				}

				minTemp = Math.min(minTemp, item.main.temp_min)
				maxTemp = Math.max(maxTemp, item.main.temp_max)
			})

			const avgTemp = Math.round(tempSum / dayData.length)
			const avgHumidity = Math.round(humiditySum / dayData.length)
			const avgWindSpeed = Math.round(windSpeedSum / dayData.length)

			const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
				weekday: "long"
			})

			forecast.push({
				date,
				title: dayOfWeek,
				temp: avgTemp,
				humidity: avgHumidity,
				windSpeed: avgWindSpeed,
				icon: dominantIcon,
				minTemp: Math.round(minTemp),
				maxTemp: Math.round(maxTemp)
			})
		})

		let current: WeatherData["current"] = null
		if (forecast.length > 0) {
			forecast[0].date = "today"
			forecast[0].title = "Today"
			current = {
				date: currentItem.dt_txt.split(" ")[0],
				title: "Today",
				temp: Math.round(currentItem.main.temp),
				humidity: Math.round(currentItem.main.humidity),
				windSpeed: Math.round(currentItem.wind.speed),
				icon: currentItem.weather[0].icon,
				minTemp: Math.round(currentItem.main.temp_min),
				maxTemp: Math.round(currentItem.main.temp_max)
			}
		}

		return { current, forecast }
	}, [data])

	return { mappedData, isLoading }
}
