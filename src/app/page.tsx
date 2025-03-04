"use client"

import dynamic from "next/dynamic"

import { useWeatherStore } from "@/store"

const Weather = dynamic(() => import("@/components/features/weather"))

export default function Home() {
	const city = useWeatherStore((state) => state.city)

	return <div>{city?.geonameId && <Weather />}</div>
}
