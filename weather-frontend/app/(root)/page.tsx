import Forecast from "@/components/Forecast";
import Humidity from "@/components/Humidity";
import SearchCity from "@/components/SearchCity";
import Sidebar from "@/components/Sidebar";
import UnitToggle from "@/components/UnitToggle";
import WindStatus from "@/components/WindStatus";
import { fetchWeather } from "@/lib/actions";
import { weatherData } from "@/lib/types";
import { convertTemp } from "@/lib/utils";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; unit?: "C" | "F" }>;
}) {
  const params = await searchParams;
  const city = params.city || "Nairobi";
  const weather = await fetchWeather({ city });

  const unit = params.unit || "C";

  const processedWeather = weather
    ? {
        ...weather,
        current: {
          ...weather.current,
          temp: convertTemp(weather.current.temp, unit),
        },
        forecast: weather.forecast.map(
          (day: weatherData["forecast"][number]) => ({
            ...day,
            temp_min: convertTemp(day.temp_min, unit),
            temp_max: convertTemp(day.temp_max, unit),
          })
        ),
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="block lg:hidden mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex items-center justify-between gap-4">
          <SearchCity city={city} />
          <UnitToggle unit={unit} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <Suspense fallback={
          <aside className="bg-white rounded-xl shadow-md p-6 h-full flex justify-center items-center">
            ...Loading...
          </aside>
        }>
          <Sidebar weather={processedWeather} unit={unit} />
        </Suspense>
        <div className="space-y-6">
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex items-center gap-4">
              <div className="flex-1 max-w-[600px]">
                <SearchCity city={city} />
              </div>
              <UnitToggle unit={unit} />
            </div>
          </div>
          <Suspense>
            <Forecast weather={processedWeather} unit={unit} />
          </Suspense>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense>
              <WindStatus weather={weather} />
              <Humidity weather={weather} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
