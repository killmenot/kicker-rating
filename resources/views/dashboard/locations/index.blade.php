@extends('layouts.master')

@section('title', 'Locations')

@section('content')

	<div class="container">

		<button id="create_location" class="btn btn-primary col-sm-2">Create Location</button>

		<div id="create_location_container" class="{!! (isset($display)) ? '' : 'hidden' !!}">
			{!! Form::open(
				array(
					'url' => '/dashboard/locations',
					'method' => 'POST',
					'class' => 'form-horizontal col-sm-6 col-sm-offset-3',
					'id' => 'create_location_form'
				))
			!!}
			<div id="create_location_group">
				<div class="row">
					<div class="col-sm-12">
						<div class="form-group">
							{!! Form::label('name', 'Name', array('class' => 'col-sm-1')) !!}
							<div>
								{!! Form::text('name', '', array('class' => 'form-control')) !!}
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div class="form-group">
							{!! Form::label('note', 'Note', array('class' => 'col-sm-1')) !!}
							<div>
								<textarea name="note" id="note" class="form-control" placeholder="Enter a note"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row pull-right">
				<div class="form-group">
					<div>
						{!! Form::submit(
                            'Submit',
                            array(
                                'id' => 'finish_locations',
                                'class' => 'btn btn-primary'
                            ))
                        !!}
						or
						<a href="javascript;" id="cancel_locations">Cancel</a>

					</div>
				</div>
			</div>

			{!! Form::close() !!}
		</div>

		@if(count($locations))
            <div id="locations_list" class="col-sm-12" style="margin-top: 15px;">
                @include('dashboard.locations.partials._locations_list')
            </div>
		@else
			<p class="col-sm-12">No any locations found.</p>
		@endif
	</div>
	<script src="{{ URL::asset('/js/locations/locations.js') }}"></script>
@endsection