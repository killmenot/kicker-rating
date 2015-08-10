@extends('layouts.master')

@section('title', 'Locations')

@section('content')

	<div class="container">

		<button id="create_location" class="btn btn-primary col-sm-2">Create Location</button>

		<div id="create_location_container" class="hidden col-sm-12" style="margin-top:15px;">
			{!! Form::open(array('url' => '/auth/login', 'method' => 'POST', 'class' => 'form-horizontal', 'id' => 'create_location_form')) !!}
				<div id="create_location_group">
					<div class="form-group">
						{!! Form::label('name', 'Name', array('class' => 'col-sm-1')) !!}
						<div class="col-sm-5">
							{!! Form::text('name', '', array('class' => 'form-control')) !!}
						</div>
						<div class="col-sm-1">
							<button type="button" id="add_more_locations" data-counter="0" class="btn btn-success">+</button>
						</div>
					</div>
				</div>
		        <div class="form-group">
		            <div class="col-sm-offset-1 col-sm-2">
		                {!! Form::submit('Finish', array('class' => 'btn btn-default')) !!}
		                <button type="button" id="cancel_locations" class="btn btn-danger">Cancel</button>
		            </div>
		        </div>
    		{!! Form::close() !!}
		</div>

		@if(count($locations))
			@foreach($locations as $location)
				<p>$location->name</p>
			@endforeach
		@else
			<p class="col-sm-12">No any locations found.</p>
		@endif
	</div>
	<script src="{{ URL::asset('/js/locations/locations.js') }}"></script>
@endsection