export type weatherData = {
  location: {
    city: string;
    country: string;
  };
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    date: string;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  };
  forecast: Array<{
    date: string;
    temp_min: number;
    temp_max: number;
    weather: {
      main: string;
      icon: string;
    };
  }>;
};
