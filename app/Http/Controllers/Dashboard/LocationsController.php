<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use App\User;
use App\Location;
use Illuminate\Support\Facades\Auth;
use Validator;

class LocationsController extends Controller
{
    /**
     * @return mixed
     */
    public function getLocations()
    {
        return View::make('dashboard.locations.index')
            ->with([
                'locations' => Location::all(),
                'active' => 'locations'
            ]);
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255|unique:locations',
            'note' => 'max:255'
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function postLocations(Request $request)
    {
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            return redirect('dashboard/locations')
                ->with('display', 'true')
                ->withInput($request->all())
                ->withErrors($validator->errors());
        }
        $location = new Location;
        $location->name = $request->input('name');
        $location->note = $request->input('note');

        $user = User::find(Auth::user()->id);
        $user->locations()->save($location);

        return redirect('/dashboard/locations');

    }

    /**
     * @param Request $request
     */
    public function postSetLocation(Request $request)
    {
        session(['location_id' => $request->input('location_id')]);
    }

    public function postDeleteLocation(Request $request)
    {
        $locationId = intval($request->input('location_id'));
        if($locationId)
        {
            Location::find($locationId)->delete();
            return response(Location::all());
        }
        return redirect('dashboard/locations')
            ->withErrors('No location id passed');
    }
}