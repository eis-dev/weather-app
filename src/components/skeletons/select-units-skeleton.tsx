import Skeleton from "@/components/ui/skeleton"

export default function SelectUnitsSkeleton() {
	return (
		<div className="flex justify-end gap-4">
			<Skeleton className="w-9 h-4" />
			<div className="w-0.5 bg-gray-400"></div>
			<Skeleton className="w-9 h-4" />
		</div>
	)
}
