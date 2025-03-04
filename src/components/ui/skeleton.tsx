import { cn } from "@/lib/utils"

export default function Skeleton({ className }: { className: string }) {
	return (
		<div className={cn("bg-gray-100 animate-pulse rounded", className)}></div>
	)
}
