<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Kicker-Rating - @yield('title')</title>
        <link href="{{ URL::asset('vendor/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ URL::asset('vendor/bootstrap/dist/css/bootstrap-theme.min.css') }}" rel="stylesheet">
        <script src="{{ URL::asset('vendor/jquery/dist/jquery.min.js') }}"></script>
        <script src="{{ URL::asset('vendor/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    </head>
    <body>
        <div class="container">
            @yield('content')
        </div>
    </body>
</html>