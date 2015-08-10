<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
	public function getLocations()
	{
		return View::make('dashboard.locations.index');
	}
}