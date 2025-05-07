<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    protected $weatherService;

    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    public function getWeather(Request $request)
    {
        $request->validate([
            'city' => 'required|string'
        ]);

        $city = $request->input('city');

        // Get coordinates for the city
        $coordinates = $this->weatherService->getCoordinates($city);
        if (!$coordinates) {
            return response()->json(['error' => 'City not found'], 404);
        }

        // Get current weather
        $currentWeather = $this->weatherService->getCurrentWeather(
            $coordinates['lat'], 
            $coordinates['lon']
        );
        if (!$currentWeather) {
            return response()->json(['error' => 'Weather data not available'], 500);
        }

        // Get forecast
        $forecast = $this->weatherService->getForecast(
            $coordinates['lat'], 
            $coordinates['lon']
        );
        if (!$forecast) {
            return response()->json(['error' => 'Forecast not available'], 500);
        }

        // Format the response
        return response()->json([
            'location' => [
                'city' => $coordinates['name'],
                'country' => $coordinates['country'],
                'lat' => $coordinates['lat'],
                'lon' => $coordinates['lon']
            ],
            'current' => [
                'temp' => $currentWeather['main']['temp'],
                'humidity' => $currentWeather['main']['humidity'],
                'wind_speed' => $currentWeather['wind']['speed'],
                'wind_direction' => $currentWeather['wind']['deg'],
                'weather' => [
                    'main' => $currentWeather['weather'][0]['main'],
                    'description' => $currentWeather['weather'][0]['description'],
                    'icon' => $currentWeather['weather'][0]['icon']
                ],
                'date' => date('Y-m-d H:i:s', $currentWeather['dt'])
            ],
            'forecast' => array_map(function($day) {
                return [
                    'date' => date($day['date']),
                    'temp_min' => $day['temp_min'],
                    'temp_max' => $day['temp_max'],
                    'weather' => [
                        'main' => $day['weather']['main'],
                        'description' => $day['weather']['description'],
                        'icon' => $day['weather']['icon']
                    ]
                ];
            }, $forecast) // Skip current and take next 3
        ]);
    }
}