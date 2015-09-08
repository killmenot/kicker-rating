@extends('layouts.master')

@section('title', 'Login Page')

@section('content')
    {!! Form::open(array('url' => '/auth/login', 'method' => 'POST', 'class' => 'form-horizontal')) !!}
        <div class="form-group">
            {!! Form::label('email', 'Email', array('class' => 'col-sm-1')) !!}
            <div class="col-sm-5">
                {!! Form::text('email', 'example@gmail.com', array('class' => 'form-control', 'value' => \Illuminate\Support\Facades\Request::old('email'))) !!}
            </div>
        </div>

        <div class="form-group">
            {!! Form::label('password', 'Password', array('class' => 'col-sm-1')) !!}
            <div class="col-sm-5">
                {!! Form::password('password', array('class' => 'form-control')) !!}
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-1 col-sm-2">
                <div class="checkbox">
                    <label>
                        {!! Form::checkbox('remember') !!}
                    </label>
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-1 col-sm-2">
                {!! Form::submit('Login', array('class' => 'btn btn-default')) !!}
            </div>
        </div>
    {!! Form::close() !!}
@endsection