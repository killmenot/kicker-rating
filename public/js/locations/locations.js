$(document).on('click', '#create_location', function(){
    $(this).hide();
    $('#create_location_container').removeClass('hidden');
});

$(document).on('click', '#add_more_locations', function(){
    var element = $(this),
        counter = element.data('counter');
    $.post('/postLocationsAdd', {counter: counter}, function(data){
        $('#create_location_group').append(data);
        element.data('counter', counter + 1);
    });
});

$(document).on('click', '.remove_current_location', function(){
    $(this).closest('.form-group').remove();
});

$(document).on('click', '#cancel_locations', function(){
    $('#create_location_container').addClass('hidden');
    $('#create_location').show();
    return false;
});

$(document).on('click', '.location_delete_button', function(){
    var locationId = $(this).data('id');

    $.post('/dashboard/locations/deleteLocation', {location_id: locationId}, function(){
        $.post('/postLocationsListPartial', function(data){
            $('#locations_list').empty().append(data);
        })
    });
    return false;
});