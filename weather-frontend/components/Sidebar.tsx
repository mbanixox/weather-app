import { weatherData } from "@/lib/types";

const Sidebar = ({ weather }: { weather: weatherData }) => {
  return (
    <>
      <div>{`Icon: ${weather?.current.weather.icon}`}</div>
      <div>{`Current temperature: ${weather?.current.temp}°C`}</div>
      <div>{`Weather: ${weather?.current.weather.description}`}</div>
      <div>{`Date: ${weather?.current.date}`}</div>
      <div>{`Location: ${weather?.location.city}`}</div>
    </>
  );
};

export default Sidebar;
