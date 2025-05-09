// components/WindStatus.tsx
import { weatherData } from "@/lib/types";

const WindStatus = ({ weather }: { weather: weatherData }) => {
  // Calculate wind direction from degrees
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45) % 8;
    return directions[index];
  };

  return (
    <div className="bg-white flex flex-col items-center justify-between rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Wind Status</h2>
      
      <div className="flex items-center justify-between">
        <div className="text-5xl font-bold text-gray-800">
          {Math.round(weather.current.wind_speed)}
          <span className="text-3xl text-gray-500"> km/h</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-blue-500 text-lg">
              {getWindDirection(weather.current.wind_direction || 0)}
            </span>
          </div>
          <span className="text-gray-600">Direction</span>
        </div>

      
    </div>
  );
};

export default WindStatus;