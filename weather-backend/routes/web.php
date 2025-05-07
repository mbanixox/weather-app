<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the Weather API',
        'endpoints' => [
            '/api/weather'
        ]
    ]);;
});
