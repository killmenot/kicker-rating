<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use App\Location;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;

class ViewsController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Locations Partials
    |--------------------------------------------------------------------------
    */

    public function postCreateLocationContainer()
    {
        return View::make('dashboard.locations.partials._create_location_container');
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function postLocationsAdd(Request $request)
    {
        $counter = $request->input('counter');

        return View::make('dashboard.locations.partials._add_location')
            ->with('counter', $counter);
    }

    /**
     * @return mixed
     */
    public function postLocationsListPartial()
    {
        $locations = Location::all();
        return View::make('dashboard.locations.partials._locations_list')
            ->with('locations', $locations);
    }
}