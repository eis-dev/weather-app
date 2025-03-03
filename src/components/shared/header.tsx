import Link from "next/link"

import SearchBar from "@/components/sections/search-bar"
import SelectUnits from "@/components/widgets/select-units"

export default function Header() {
	return (
		<header>
			<div>
				<div>
					<Link href="/">
						<h1>Weather App</h1>
					</Link>
				</div>

				<div>
					<SelectUnits />
				</div>

				<div>
					<SearchBar />
				</div>
			</div>
		</header>
	)
}
