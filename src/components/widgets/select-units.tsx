"use client"

import { useWeatherStore } from "@/store"

export default function SelectUnits() {
	const units = useWeatherStore((state) => state.units)
	const setUnits = useWeatherStore((state) => state.setUnits)

	const unitTypes = ["metric", "imperial"]

	return (
		<div>
			{unitTypes.map((unit) => (
				<button
					key={unit}
					className={units === unit ? "active" : ""}
					onClick={() => setUnits(unit)}
				>
					{unit}
				</button>
			))}
			<div>Current unit: {units}</div>
		</div>
	)
}
