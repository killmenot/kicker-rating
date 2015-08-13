@if(count($locations))
    @foreach($locations as $location)
        <li>
            <a
                class="user_menu_set_location {!! (session('location_id') && session('location_id') == $location->id) ? 'glyphicon glyphicon-ok' : ''!!}"
                href="javascript;"
                data-id="{!! $location->id !!}">
                {!! $location->name !!}
            </a>
        </li>
    @endforeach
@else
    <li>
        <a href="javascript;">No locations available</a>
    </li>
@endif
<li role="separator" class="divider"></li>
<li><a href="{{ URL::action('Auth\AuthController@getLogout') }}">Logout</a></li>
