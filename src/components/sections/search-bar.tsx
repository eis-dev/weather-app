"use client"

import { useMemo, useState } from "react"

import { Geoname } from "@/types"

import { useCity, useClickOutside, useDebounce, useGeonames } from "@/hooks"

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
		<div ref={ref}>
			<input
				placeholder="City"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onFocus={() => setInputFocus(true)}
			/>

			{(isLoading || error || resultList.length > 0) && (
				// dropdown
				<div>
					{isLoading && <div>Loading...</div>}

					{error && <div>{error?.message}</div>}

					{resultList?.length > 0 && (
						<ul>
							{resultList?.map((geoname: Geoname) => (
								<li
									key={geoname.geonameId}
									onClick={() => handleSelect(geoname)}
								>
									<strong>{geoname.name}</strong>, {geoname.countryName}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	)
}
