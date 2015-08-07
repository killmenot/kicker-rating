@extends('layouts.master')

@section('title', 'Register Page')

@section('content')
    {!! Form::open(array('url' => '/auth/register', 'method' => 'POST', 'class' => 'form-horizontal')) !!}
        <div class="form-group">
            {!! Form::label('name', 'Name', array('class' => 'col-sm-1')) !!}
            <div class="col-sm-5">
                {!! Form::text('name', '', array('class' => 'form-control', 'value' => \Illuminate\Support\Facades\Request::old('name'))) !!}
            </div>
        </div>

        <div class="form-group">
            {!! Form::label('email', 'Email', array('class' => 'col-sm-1')) !!}
            <div class="col-sm-5">
                {!! Form::text('email', '', array('class' => 'form-control', 'value' => \Illuminate\Support\Facades\Request::old('email'))) !!}
            </div>
        </div>

        <div class="form-group">
            {!! Form::label('password', 'Password', array('class' => 'col-sm-1')) !!}
            <div class="col-sm-5">
                {!! Form::password('password', array('class' => 'form-control')) !!}
            </div>
        </div>

        <div class="form-group">
            {!! Form::label('password_confirmation', 'Confirm Password', array('class' => 'col-sm-1')) !!}
            <div class="col-sm-5">
                {!! Form::password('password_confirmation', array('class' => 'form-control')) !!}
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-1 col-sm-2">
                {!! Form::submit('Register', array('class' => 'btn btn-default')) !!}
            </div>
        </div>
    {!! Form::close() !!}
@endsection