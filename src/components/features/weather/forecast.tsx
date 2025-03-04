import Image from "next/image"

import { WeatherDataItem } from "@/types"

export default function Forecast({ data }: { data: WeatherDataItem[] }) {
	return (
		<div className="flex flex-col justify-between gap-4 pl-8 pr-6">
			{data.map((day) => (
				<div key={day.date} className="flex items-center gap-4 justify-between">
					<div className="flex-1">
						<p className="text-gray-400 text-lg">{day.title}:</p>
					</div>
					<div>
						<p className="text-gray-500 text-lg">
							{day.minTemp}° / {day.maxTemp}°
						</p>
					</div>
					<div>
						<Image
							src={`/images/${day.icon}.svg`}
							alt="Weather"
							width={48}
							height={48}
						/>
					</div>
				</div>
			))}
		</div>
	)
}
