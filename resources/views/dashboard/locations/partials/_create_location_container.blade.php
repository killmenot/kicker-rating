{!! Form::open(
				array(
					'url' => '/dashboard/locations',
					'method' => 'POST',
					'class' => 'form-horizontal',
					'id' => 'create_location_form'
				))
			!!}
<div id="create_location_group">
    <div class="form-group">
        {!! Form::label('name', 'Name', array('class' => 'col-sm-1')) !!}
        <div class="col-sm-5">
            {!! Form::text('name', '', array('class' => 'form-control')) !!}
        </div>
    </div>
</div>
<div class="form-group">
    <div class="col-sm-offset-1 col-sm-4">
        {!! Form::button(
            'Finish',
            array(
                'id' => 'finish_locations',
                'class' => 'btn btn-default'
            ))
        !!}

        {!! Form::button(
            'Add New Location',
            array(
                'id' => 'add_more_locations',
                'class' => 'btn btn-success',
                'data-counter' => 0
            ))
        !!}

        {!! Form::button(
            'Cancel',
            array(
                'id' => 'cancel_locations',
                'class' => 'btn btn-danger'
            ))
        !!}

    </div>
</div>
{!! Form::close() !!}