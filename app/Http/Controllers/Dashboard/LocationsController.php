<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use App\User;
use App\Location;
use Illuminate\Support\Facades\Auth;

class LocationsController extends Controller
{
    /**
     * @return mixed
     */
    public function getLocations()
    {
        return View::make('dashboard.locations.index')
            ->with('locations', Location::all());
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function postLocations(Request $request)
    {
        if($request->ajax())
        {
            $locations = $request->json()->all();
            foreach($locations as $location)
            {
                if(isset($location['name']) && isset($location['value']))
                {
                    $locationModel = new Location;
                    $locationModel->{$location['name']} = $location['value'];
                    $user = User::find(Auth::user()->id);
                    $user->locations()->save($locationModel);
                }
            }
            return response(Location::all());
        }
        return response('Incorrect request type')
            ->header('HTTP/1.1 500 Internal Server Error');
    }

    /**
     * @param Request $request
     */
    public function postSetLocation(Request $request)
    {
        session(['location_id' => $request->input('location_id')]);
    }
}