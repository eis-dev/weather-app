"use client"

import Link from "next/link"

import { useWeatherStore } from "@/store"

import SearchBar from "@/components/features/search-bar"
import SelectUnitsSkeleton from "@/components/skeletons/select-units-skeleton"
import SelectUnits from "@/components/widgets/select-units"

export default function Header() {
	const isHydrated = useWeatherStore((state) => state.isHydrated)

	return (
		<header>
			<div className="flex gap-8 items-center justify-center px-8">
				<div className="flex flex-col gap-8 flex-1">
					<div className="flex justify-between">
						<div>
							<Link href="/">
								<h1 className="text-gray-500 text-3xl font-bold">
									Weather App
								</h1>
							</Link>
						</div>

						{isHydrated ? <SelectUnits /> : <SelectUnitsSkeleton />}
					</div>
					<SearchBar />
				</div>
			</div>
		</header>
	)
}
