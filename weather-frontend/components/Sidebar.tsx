import { weatherData } from "@/lib/types";
import Image from "next/image";

const Sidebar = ({ weather }: { weather: weatherData }) => {
  const currentDate = new Date(weather.current.date);
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  
  return (
    <aside className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
  
      <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-2">
        <Image
          src={`https://openweathermap.org/img/wn/${weather.current.weather.icon}@4x.png`}
          alt={weather.current.weather.description}
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="mb-4 text-center">
        <p className="text-5xl font-bold text-gray-800">
          {Math.round(weather.current.temp)}°C
        </p>
        <p className="text-xl text-gray-600 capitalize">
          {weather.current.weather.description}
        </p>
      </div>

      <div className="mt-auto p-4 text-center">
        <p className="text-gray-800">{formattedDate}</p>
        <p className="font-bold text-gray-500">
          {weather.location.city}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
