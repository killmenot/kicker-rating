<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class LocationsController extends Controller
{
	public function getLocations()
	{
		$locations = Auth::user()->locations;
		return View::make('dashboard.locations.index')->with('locations', $locations);
	}
}