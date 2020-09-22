<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// @TODO: Auth

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'v1'], function () {
    Route::post('auth/refresh' , 'TokensController@refreshToken');
    Route::post('auth/logout' , 'TokensController@logout');
});

Route::group(['middleware' => [], 'prefix' => 'v1'], function () {
    Route::post('auth/login' , 'TokensController@login');
    Route::post('auth/register' , 'TokensController@register');
});
