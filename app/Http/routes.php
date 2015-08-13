<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => ['auth']], function()
{
    Route::get('/dashboard', function()
    {
        return view('dashboard.index');
    });

    Route::get('/dashboard/locations', 'Dashboard\LocationsController@getLocations');
    Route::post('/dashboard/locations', 'Dashboard\LocationsController@postLocations');
    Route::post('/dashboard/locations/setLocation', 'Dashboard\LocationsController@postSetLocation');


    /*
    |--------------------------------------------------------------------------
    | View Routes
    |--------------------------------------------------------------------------
    */

    /*Layout*/
    Route::post('/postLocationsNamesListPartial', 'View\ViewsController@postLocationsNamesListPartial');

    /*Locations*/
    Route::post('/postCreateLocationContainer', 'View\ViewsController@postCreateLocationContainer');
    Route::post('/postLocationsAdd', 'View\ViewsController@postLocationsAdd');
    Route::post('/postLocationsListPartial', 'View\ViewsController@postLocationsListPartial');
});

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');
