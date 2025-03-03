import { NextResponse } from "next/server"

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get("query")

	if (!query) {
		return NextResponse.json(
			{ error: "Query param is required" },
			{ status: 400 }
		)
	}

	const API_URL = process.env.GEONAMES_API_URL
	const API_USER = process.env.GEONAMES_API_USERNAME

	if (!API_URL || !API_USER) {
		return NextResponse.json(
			{ error: "API credentials not found" },
			{ status: 500 }
		)
	}

	try {
		const response = await fetch(
			`${API_URL}?name_startsWith=${query}&featureClass=A&maxRows=5&lang=en&username=${API_USER}`
		)

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Geonames API request failed" },
				{ status: response.status }
			)
		}

		const data = await response.json()

		// if no cities found
		if (!data?.geonames?.length) {
			return NextResponse.json({ error: "No cities found" }, { status: 404 })
		}

		return NextResponse.json(data)
	} catch {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
