import Forecast from "@/components/Forecast";
import Humidity from "@/components/Humidity";
import Sidebar from "@/components/Sidebar";
import WindStatus from "@/components/WindStatus";
import { fetchWeather } from "@/lib/actions";

export default async function Home() {
  const weather = await fetchWeather({ city: "Nairobi" });

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <Sidebar weather={weather} />
        <div className="space-y-6">
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
