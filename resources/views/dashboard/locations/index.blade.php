@extends('layouts.master')

@section('title', 'Locations')

@section('content')

	<div class="container">

		<button id="create_location" class="btn btn-primary col-sm-2">Create Location</button>

		<div id="create_location_container" class="col-sm-12" style="margin-top:15px;"></div>

		@if(count($locations))
            <div id="locations_list" class="col-sm-12" style="margin-top: 15px;">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Location Name</th>
                            <th>Created By </th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($locations as $location)
                            <tr>
                                <td>{!! $location->name !!}</td>
                                <td>{!! $location->user->name !!}</td>
                                <td>{!! $location->created_at !!}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
		@else
			<p class="col-sm-12">No any locations found.</p>
		@endif
	</div>
	<script src="{{ URL::asset('/js/locations/locations.js') }}"></script>
@endsection