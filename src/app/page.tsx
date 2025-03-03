"use client"

import dynamic from "next/dynamic"

import { useWeatherStore } from "@/store"

import { useWeather } from "@/hooks"

const Weather = dynamic(() => import("@/components/sections/weather"), {
	ssr: false
})

export default function Home() {
	const { data, isLoading } = useWeather()
	const city = useWeatherStore((state) => state.city)

	return (
		<div>
			{isLoading && <div>Loading...</div>}

			{data?.list?.length > 0 && (
				<div>
					<div>
						<strong>{city?.name}</strong>, {city?.countryName}
					</div>

					<Weather data={data?.list[0]} />
				</div>
			)}
		</div>
	)
}
