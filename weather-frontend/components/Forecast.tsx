import { weatherData } from "@/lib/types";

const Forecast = ({ weather }: { weather: weatherData }) => {
  return (
    <div>
      <div>
        {weather.forecast.map((day, index) => (
          <div key={index}>
            <div>
              {day.date}
            </div>
            <div>
              <div>Icon: ${day.weather.icon}</div>
              <div>
                <p>
                  {Math.round(day.temp_max)}-{Math.round(day.temp_min)}°C
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
