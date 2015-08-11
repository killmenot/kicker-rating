<table class="table table-striped">
    <thead>
    <tr>
        <th>Location Name</th>
        <th>Created By </th>
        <th>Created At</th>
    </tr>
    </thead>
    <tbody>
    @foreach($locations as $location)
        <tr>
            <td>{!! $location->name !!}</td>
            <td>{!! $location->user->name !!}</td>
            <td>{!! $location->created_at !!}</td>
        </tr>
    @endforeach
    </tbody>
</table>