<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('title') - Kicker-Rating</title>
        <link href="{{ URL::asset('/css/main.css') }}" rel="stylesheet">
        <link href="{{ URL::asset('vendor/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ URL::asset('vendor/bootstrap/dist/css/bootstrap-theme.min.css') }}" rel="stylesheet">
        <script src="{{ URL::asset('vendor/jquery/dist/jquery.min.js') }}"></script>
        <script src="{{ URL::asset('js/config.js') }}"></script>
        <script src="{{ URL::asset('vendor/bootstrap/dist/js/bootstrap.min.js') }}"></script>
        <script src="{{ URL::asset('js/layouts/master/account_menu.js') }}"></script>
    </head>
    <body role="document">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Rating</a>
            </div>

            <div class="collapse navbar-collapse" id="navbar">
                <ul class="nav navbar-nav">

                    @if(Auth::check())
                        <li>
                            <a href="{!! URL::action('Dashboard\AdminController@getAdmin') !!}">Admin</a>
                        </li>
                    @endif

                    {{--<li class="{!! (isset($active) && $active == 'locations') ? 'active' : '' !!}">
                        <a href="{{ URL::action('Dashboard\LocationsController@getLocations') }}">
                            Locations
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>

                    <li><a href="#">Link</a></li>--}}

                </ul>

                <ul class="nav navbar-nav navbar-right">
                    @if(Auth::check())
                        @if(isset($locations) && count($locations))
                        <li class="dropdown">
                            <a href="#" class="account_menu dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                Locations
                                <span class="caret"></span>
                                <ul class="account_append_section dropdown-menu">
                                    <li class="hidden"><a href="javascript;"></a></li>
                                </ul>
                            </a>
                        </li>
                        @endif

                    @endif

                    @if(Auth::check())
                        <li><a href="{!! URL::action('Auth\AuthController@getLogout') !!}">Sign out</a></li>
                    @else
                            <li><a href="{!! URL::action('Auth\AuthController@getLogin') !!}">Sign in</a></li>
                    @endif
                </ul>

            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>

    @if(Auth::user())
        <div class="navbar navbar-default navbar-static-top" style="margin-top:50px;">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".main-nav">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse main-nav">
                    <ul class="nav navbar-nav">
                        <li class="{!! (isset($active) && $active == 'locations') ? 'active' : '' !!}">
                            <a href="{!! URL::action('Dashboard\LocationsController@getLocations') !!}">Locations</a>
                        </li>
                        <li><a href="/admin/seasons">Seasons</a></li>
                        <li><a href="/admin/tournaments">Tournaments</a></li>
                    </ul>
                </div>
            </div>
        </div>
    @endif

    <div class="container" style="margin-top: 50px;">
       @if(count($errors->all()))

           @foreach($errors->all() as $error)

                <div class="alert alert-danger">{!! $error !!}</div>

            @endforeach

        @endif

        @yield('content')
    </div>

    </body>
</html>