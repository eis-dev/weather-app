import { NextResponse } from "next/server"

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const lat = searchParams.get("lat")
	const lon = searchParams.get("lon")
	const units = searchParams.get("units")

	if (!lat || !lon) {
		return NextResponse.json(
			{ error: "Lat and lon params is required" },
			{ status: 400 }
		)
	}

	const API_URL = process.env.OPENWEATHERMAP_API_URL
	const API_KEY = process.env.OPENWEATHERMAP_API_KEY

	if (!API_URL || !API_KEY) {
		return NextResponse.json(
			{ error: "API credentials not found" },
			{ status: 500 }
		)
	}

	try {
		const response = await fetch(
			`${API_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
		)

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Weather API request failed" },
				{ status: response.status }
			)
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
