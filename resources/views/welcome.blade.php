@extends('layouts.master')

@section('title', 'Dashboard')

@section('content')

    <div class="main_page_logo_buttons">
        @if(Auth::check())
            <a href="{{ url("/dashboard") }}" class="btn btn-primary btn-lg">Proceed To Dashboard</a>
        @else
            <a href="{{ URL::action('Auth\AuthController@getLogin') }}" class="btn btn-primary btn-lg">Sign In</a>
            <a href="{{ URL::action('Auth\AuthController@getRegister') }}" class="btn btn-primary btn-lg">Sign Up</a>
        @endif
    </div>

@endsection