"use server";

export const fetchWeather = async ({ city }: { city: string }) => {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/weather?city=${city}`
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return res.json();
  };