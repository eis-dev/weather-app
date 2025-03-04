import Image from "next/image"

import { useWeatherStore } from "@/store"

import { WeatherDataItem } from "@/types"

export default function CurrentWeather({ data }: { data: WeatherDataItem }) {
	const city = useWeatherStore((state) => state.city)
	const units = useWeatherStore((state) => state.units) as "metric" | "imperial"

	const speedUnits = {
		metric: "km/h",
		imperial: "mph"
	}

	return (
		<div className="flex items-center gap-0 sm:gap-4 flex-1">
			<div>
				<Image
					src={`/images/${data.icon}.svg`}
					alt="Weather Icon"
					width={24}
					height={24}
					className="w-32 sm:w-48"
				/>
			</div>

			<div className="flex flex-col items-start gap-6 pl-2 pr-8 sm:px-2 py-4">
				<p className="text-gray-300 text-2xl sm:text-3xl font-bold">
					<span className="text-gray-400">{city?.name}</span>
					<span>, {city?.countryName}</span>
				</p>
				<p className="text-gray-500 text-7xl sm:text-8xl font-thin">
					{Math.round(data.temp)}°
				</p>
				<div
					className="flex py-2 gap-6 sm:gap-8 opacity-75
				"
				>
					<div className="flex items-center gap-2">
						<Image
							src="/images/humidity.svg"
							alt="Humidity"
							width={36}
							height={32}
						/>
						<p className="text-gray-400 whitespace-nowrap">%{data.humidity}</p>
					</div>

					<div className="flex items-center gap-2">
						<Image
							src="/images/wind.svg"
							alt="Wind Speed"
							width={48}
							height={48}
						/>
						<p className="text-gray-400 whitespace-nowrap">
							{data.windSpeed} {speedUnits[units] || "km/h"}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
