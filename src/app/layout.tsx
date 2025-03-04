import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Geist } from "next/font/google"

import "./globals.css"

import Providers from "@/providers"

const Header = dynamic(() => import("@/components/shared/header"))

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "Weather App",
	description: "Weather App Case Study"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} antialiased`}>
				<Providers>
					<div className="min-h-screen flex flex-col justify-evenly items-center">
						<div className="max-w-6xl w-full mx-auto flex flex-col gap-8 sm:gap-18 pt-12 pb-24 sm:pb-48 md:pb-64">
							<Header />

							<main>{children}</main>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}
