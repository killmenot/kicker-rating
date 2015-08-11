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
    </head>
    <body>
        <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Kicker-Rating</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    
                    <li class="active">
                        <a href="{{ URL::action('Dashboard\LocationsController@getLocations') }}">
                            Locations
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    
                    <li><a href="#">Link</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">One more separated link</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="navbar-form navbar-left" role="search">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
                <ul class="nav navbar-nav navbar-right">

                    @if(Auth::check())
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                {{ Auth::user()->name }}
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="{{ URL::action('Auth\AuthController@getLogout') }}">Logout</a></li>
                            </ul>
                        </li>
                    @endif

                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
        <div class="container-fluid">
           @if(count($errors->all()))
               @foreach($errors->all() as $error)
                    <p class="bg-danger">{!! $error !!}</p>
                @endforeach
            @endif

            @yield('content')
        </div>
    </body>
</html>