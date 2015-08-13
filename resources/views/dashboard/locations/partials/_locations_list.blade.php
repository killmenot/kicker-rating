<table class="table table-striped">
    <thead>
    <tr>
        <th>Location Name</th>
        <th>Created By </th>
        <th>Created At</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>
    </thead>
    <tbody>
    @foreach($locations as $location)
        <tr>
            <td>{!! $location->name !!}</td>
            <td>{!! $location->user->name !!}</td>
            <td>{!! $location->created_at !!}</td>
            <td><a href="javascript;">Edit</a></td>
            <td><a class="btn btn-danger" href="javascript;">Delete</a></td>
        </tr>
    @endforeach
    </tbody>
</table>