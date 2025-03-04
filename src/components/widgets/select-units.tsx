"use client"

import React from "react"

import { useWeatherStore } from "@/store"

import { cn } from "@/lib/utils"

export default function SelectUnits() {
	const units = useWeatherStore((state) => state.units)
	const setUnits = useWeatherStore((state) => state.setUnits)

	const unitOptions = [
		{ label: "°C", value: "metric" },
		{ label: "°F", value: "imperial" }
	]

	return (
		<div className="flex justify-end gap-4">
			{unitOptions.map(({ label, value }, index) => {
				const isActive = units === value

				return (
					<React.Fragment key={value}>
						<button
							className={cn(
								isActive ? "text-gray-500" : "text-gray-300",
								"cursor-pointer transition-colors font-bold"
							)}
							onClick={() => setUnits(value)}
						>
							{label}
						</button>
						{index === 0 && <div className="w-0.5 bg-gray-400"></div>}
					</React.Fragment>
				)
			})}
		</div>
	)
}
