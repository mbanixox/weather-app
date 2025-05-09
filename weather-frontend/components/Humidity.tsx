// components/Humidity.tsx
import { weatherData } from "@/lib/types";

const Humidity = ({ weather }: { weather: weatherData }) => {
  const humidity = weather.current.humidity;

  return (
    <div className="bg-white text-center rounded-xl shadow-md p-6">
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Humidity</h2>
      
      <div className="text-center mb-6">
        <span className="text-5xl font-bold text-gray-800">{humidity}</span>
        <span className="text-2xl text-gray-500">%</span>
      </div>
      
      <div className="space-y-2">
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${humidity}%` }}
          ></div>
        </div>
        
        {/* Scale Markers */}
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default Humidity;