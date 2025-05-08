import { weatherData } from "@/lib/types";

const WindStatus = ({ weather }: { weather: weatherData }) => {
    return (
        <>
        <div>Wind Status</div>
        <div>{`Wind Speed: ${weather?.current.wind_speed} km/h`}</div>
        <div>{`Wind Direction: ${weather?.current.wind_direction}`}</div>
        </>
    )
};

export default WindStatus;