import Forecast from "@/components/Forecast";
import Humidity from "@/components/Humidity";
import SearchCity from "@/components/SearchCity";
import Sidebar from "@/components/Sidebar";
import WindStatus from "@/components/WindStatus";
import { fetchWeather } from "@/lib/actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const params = await searchParams;
  const city = params.city || "Nairobi";
  const weather = await fetchWeather({ city });

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="block lg:hidden mb-6">
        <SearchCity city={city} />
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <Sidebar weather={weather} />
        <div className="space-y-6">
          <div className="hidden lg:block">
            <SearchCity city={city} />
          </div>
          <Forecast weather={weather} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WindStatus weather={weather} />
            <Humidity weather={weather} />
          </div>
        </div>
      </div>
    </div>
  );
}
