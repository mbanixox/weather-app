import { weatherData } from "@/lib/types";
import Image from "next/image";

const Forecast = ({
  weather,
  unit,
}: {
  weather: weatherData;
  unit?: "C" | "F";
}) => {
  const value = unit === "C" ? "°C" : "F";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weather.forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between bg-white border rounded-lg p-4 shadow-sm"
          >
            <p className="font-medium">
              {new Date(day.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
              })}
            </p>

            <div>
              <Image
                src={`https://openweathermap.org/img/wn/${day.weather.icon}@4x.png`}
                alt={day.weather.main}
                width={150}
                height={150}
              />
            </div>
            <div>
              <p className="text-lg">
                {Math.round(day.temp_max)}-{Math.round(day.temp_min)}{value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
