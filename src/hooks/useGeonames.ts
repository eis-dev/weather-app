import { useQuery } from "@tanstack/react-query"

const fetchGeonames = async (query: string) => {
	const res = await fetch(`/api/geonames?query=${query}`)

	if (!res.ok) {
		throw new Error((await res.json())?.error || "An error occurred")
	}

	return res.json()
}

export const useGeonames = (query: string) => {
	return useQuery({
		queryKey: ["geonames", query],
		queryFn: () => fetchGeonames(query),
		enabled: !!query,
		staleTime: Infinity,
		retry: 0
	})
}
