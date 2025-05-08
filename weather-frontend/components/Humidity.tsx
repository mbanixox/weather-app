import { weatherData } from "@/lib/types";

const Humidity = ({ weather }: { weather: weatherData }) => {
    return (
        <>
        <div>Humidity</div>
        <div>{`Humidity: ${weather?.current.humidity}%`}</div>
        <div>Progress Bar</div>
        </>
    )
}

export default Humidity;