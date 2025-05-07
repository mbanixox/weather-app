<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class WeatherService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('weather.api_key');
    }

    public function getCoordinates($city)
    {
        try {
            $response = $this->client->get(config('weather.geocoding_url'), [
                'query' => [
                    'q' => $city,
                    'limit' => 1,
                    'appid' => $this->apiKey
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            if (empty($data)) {
                return null;
            }

            return [
                'lat' => $data[0]['lat'],
                'lon' => $data[0]['lon'],
                'name' => $data[0]['name'],
                'country' => $data[0]['country']
            ];
        } catch (\Exception $e) {
            Log::error("Geocoding error: " . $e->getMessage());
            return null;
        }
    }

    public function getCurrentWeather($lat, $lon)
    {
        try {
            $response = $this->client->get(config('weather.weather_url'), [
                'query' => [
                    'lat' => $lat,
                    'lon' => $lon,
                    'appid' => $this->apiKey,
                    'units' => 'metric'
                ]
            ]);

            return json_decode($response->getBody(), true);
        } catch (\Exception $e) {
            Log::error("Current weather error: " . $e->getMessage());
            return null;
        }
    }

    public function getForecast($lat, $lon)
{
    try {
        $response = $this->client->get(config('weather.forecast_url'), [
            'query' => [
                'lat' => $lat,
                'lon' => $lon,
                'appid' => $this->apiKey,
                'units' => 'metric'
            ]
        ]);

        $data = json_decode($response->getBody(), true);
        
        $groupedByDay = [];
        foreach ($data['list'] as $forecast) {
            $date = date('Y-m-d', $forecast['dt']);
            
            if (!isset($groupedByDay[$date])) {
                $groupedByDay[$date] = [
                    'date' => $date,
                    'temp_min' => $forecast['main']['temp_min'],
                    'temp_max' => $forecast['main']['temp_max'],
                    'temps' => [],
                    'weather' => []
                ];
            }
            
            // Collect all temps for the day to calculate min/max
            $groupedByDay[$date]['temps'][] = $forecast['main']['temp'];
            
            // Keep weather from midday forecast
            if (date('H', $forecast['dt']) == 12) {
                $groupedByDay[$date]['weather'] = [
                    'main' => $forecast['weather'][0]['main'],
                    'description' => $forecast['weather'][0]['description'],
                    'icon' => $forecast['weather'][0]['icon']
                ];
            }
        }

        // Calculate actual min/max from collected temperatures
        foreach ($groupedByDay as &$day) {
            $day['temp_min'] = min($day['temps']);
            $day['temp_max'] = max($day['temps']);
            unset($day['temps']); // Clean up temporary storage
        }

        $dailyForecasts = array_values($groupedByDay);
        return array_slice($dailyForecasts, 1, 3);
    } catch (\Exception $e) {
        Log::error("Forecast error: " . $e->getMessage());
        return null;
    }
}
}
