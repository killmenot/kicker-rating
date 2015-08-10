<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
//use App\User;
//use Illuminate\Support\Facades\Auth;

class ViewsController extends Controller
{
	public function postLocationsAdd(Request $request)
	{
		$counter = $request->input('counter');

		return View::make('dashboard.locations.partials._add_location')->with('counter', $counter);
	}
}