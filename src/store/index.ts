import { create } from "zustand"
import { persist } from "zustand/middleware"

import { WeatherStore } from "@/types"

export const useWeatherStore = create<WeatherStore>()(
	persist(
		(set) => ({
			units: "metric",
			setUnits: (units) => set({ units }),
			isHydrated: false,
			setIsHydrated: (isHydrated) => set({ isHydrated })
		}),
		{
			name: "weather-storage",
			onRehydrateStorage: () => (state) => {
				state?.setIsHydrated(true)
			}
		}
	)
)
