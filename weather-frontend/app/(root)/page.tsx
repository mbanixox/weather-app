import Forecast from "@/components/Forecast";
import Humidity from "@/components/Humidity";
import Sidebar from "@/components/Sidebar";
import WindStatus from "@/components/WindStatus";
import { fetchWeather } from "@/lib/actions";

export default async function Home() {
  const weather = await fetchWeather({ city: "Nairobi" });

  return (
    <>
      <Sidebar weather={weather} />
      <Forecast weather={weather}/>
      <div>
        <WindStatus weather={weather} />
        <Humidity weather={weather} />
      </div>
    </>
  );
}
