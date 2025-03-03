import QueryProvider from "@/providers/queryProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
	return <QueryProvider>{children}</QueryProvider>
}
