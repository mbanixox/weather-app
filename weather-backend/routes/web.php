<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the Weather API',
        'endpoints' => [
            '/api/weather'
        ]
    ]);;
});

Route::get('/api/weather', [WeatherController::class, 'getWeather']);
