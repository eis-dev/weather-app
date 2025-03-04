import Skeleton from "@/components/ui/skeleton"

export default function ForecastSkeleton() {
	return (
		<div className="flex flex-col justify-between gap-4 pl-8 pr-6">
			{Array.from({ length: 5 }).map((_, index) => (
				<div key={index} className="flex items-center gap-4 justify-between">
					<div className="flex-1">
						<Skeleton className="w-16 h-7" />
					</div>
					<div>
						<Skeleton className="w-7 h-7" />
					</div>
					<div>
						<Skeleton className="w-12 h-12" />
					</div>
				</div>
			))}
		</div>
	)
}
