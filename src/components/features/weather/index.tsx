import CurrentWeather from "@/components/features/weather/current-weather"
import Forecast from "@/components/features/weather/forecast"
import CurrentWeatherSkeleton from "@/components/skeletons/current-weather-skeleton"
import ForecastSkeleton from "@/components/skeletons/forecast-skeleton"
import { useWeather } from "@/hooks"

export default function Weather() {
	const { mappedData, isLoading } = useWeather()

	return (
		<div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
			{isLoading && (
				<>
					<CurrentWeatherSkeleton />
					<ForecastSkeleton />
				</>
			)}

			{mappedData?.current && Object.keys(mappedData.current).length > 0 && (
				<CurrentWeather data={mappedData?.current} />
			)}

			{mappedData?.forecast?.length > 0 && (
				<Forecast data={mappedData?.forecast} />
			)}
		</div>
	)
}
