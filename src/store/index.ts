import { create } from "zustand"
import { persist } from "zustand/middleware"

import { WeatherStore } from "@/types"

export const useWeatherStore = create<WeatherStore>()(
	persist(
		(set) => ({
			units: "metric",
			city: null,
			cityHistory: [],
			setUnits: (units) => set({ units }),
			setCity: (city) => set({ city }),
			setCityHistory: (cityHistory) => set({ cityHistory }),
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
