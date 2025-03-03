import Link from "next/link"

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
			</div>
		</header>
	)
}
