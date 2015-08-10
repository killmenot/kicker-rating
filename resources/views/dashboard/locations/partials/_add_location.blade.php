<div class="form-group">
    <label for="name{{ $counter }}" class="col-sm-1">Name</label>
    <div class="col-sm-5">
        <input type="text" name="name{{ $counter }}" class="form-control" />
    </div>
    <div class="col-sm-2">
        <button type="button" id="add_more_locations" data-counter="{{ $counter }}" class="btn btn-success">+</button>
        <button type="button" id="remove_current_location" data-counter="{{ $counter }}" class="btn btn-danger">-</button>
    </div>
</div>