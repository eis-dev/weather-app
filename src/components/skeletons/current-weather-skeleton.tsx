import Image from "next/image"

import { useWeatherStore } from "@/store"

import Skeleton from "@/components/ui/skeleton"

export default function CurrentWeatherSkeleton() {
	const city = useWeatherStore((state) => state.city)

	return (
		<div className="flex items-center gap-0 sm:gap-4 flex-1">
			<div>
				<div className="p-8">
					<Skeleton className="w-16 h-16 sm:w-32 sm:h-32" />
				</div>
			</div>

			<div className="flex flex-col items-start gap-6 pl-2 pr-8 sm:px-2 py-4">
				<p className="text-gray-300 text-xl sm:text-3xl font-bold">
					<span className="text-gray-400">{city?.name}</span>
					<span>, {city?.countryName}</span>
				</p>

				<Skeleton className="w-[108px] h-[72px] sm:w-36 sm:h-24" />
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
						<Skeleton className="w-[32px] h-6" />
					</div>

					<div className="flex items-center gap-2">
						<Image
							src="/images/wind.svg"
							alt="Wind Speed"
							width={48}
							height={48}
						/>
						<Skeleton className="w-[66px] h-6" />
					</div>
				</div>
			</div>
		</div>
	)
}
