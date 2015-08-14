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
<li class="hidden"><a href="javascript;"></a></li>
