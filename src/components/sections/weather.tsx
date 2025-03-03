import { WeatherData } from "@/types"

export default function Weather({ data }: { data: WeatherData }) {
	return (
		data && (
			<>
				<div>Sıcaklık: {data.main.temp}</div>
				<div>Hava durumu koşulu: {data.weather[0].main}</div>
				<div>Nem: {data.main.humidity}</div>
				<div>Hava durumu icon: {data.weather[0].icon}</div>
				<div>Rüzgar hızı: {data.wind.speed}</div>
			</>
		)
	)
}
