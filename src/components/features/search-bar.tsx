"use client"

import { useMemo, useState } from "react"

import { useCity, useClickOutside, useDebounce, useGeonames } from "@/hooks"
import { Geoname } from "@/types"

export default function SearchBar() {
	const [query, setQuery] = useState("")
	const [inputFocus, setInputFocus] = useState(false)

	const debouncedQuery = useDebounce(query, 300)

	const { data, error, isLoading } = useGeonames(debouncedQuery)
	const { selectCity, cityHistory } = useCity()

	const ref = useClickOutside<HTMLDivElement>(() => setInputFocus(false))

	const handleSelect = (city: Geoname) => {
		selectCity(city)
		setQuery("")
		setInputFocus(false)
	}

	const resultList = useMemo(() => {
		if (query && debouncedQuery) {
			return data?.geonames ?? []
		}

		if (inputFocus) {
			return cityHistory ?? []
		}

		return []
	}, [query, debouncedQuery, data, cityHistory, inputFocus])

	return (
		<div ref={ref} className="relative max-w-xl">
			<input
				type="text"
				className="w-full max-w-96 border-b border-gray-300 focus:border-gray-400 transition duration-500 focus:ring-0 outline-none py-2 placeholder-gray-400"
				placeholder="Search for a city"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onFocus={() => setInputFocus(true)}
			/>

			{(isLoading || error || resultList.length > 0) && (
				<div className="absolute z-10 w-full rounded-b bg-white border-b border border-gray-200 p-1 mt-1">
					{isLoading && <p className="p-2 text-gray-400">Loading...</p>}

					{error && <p className="p-2 text-gray-400">{error?.message}</p>}

					{resultList?.length > 0 && (
						<ul>
							{resultList?.map((geoname: Geoname) => (
								<li
									key={geoname.geonameId}
									onClick={() => handleSelect(geoname)}
									className="cursor-pointer p-2 hover:bg-gray-200"
								>
									<p className="text-gray-600">
										<strong>{geoname.name}</strong>, {geoname.countryName}
									</p>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	)
}
