$(document).on('click', '#create_location', function(){
    $(this).prop('disabled', true);
    $.post('/postCreateLocationContainer', function(data){
        $('#create_location_container').empty().append(data);
    });
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

$(document).on('click', '#finish_locations', function(){
    var inputGroups = $('#create_location_group').children('div'),
        data = {};
    $.each(inputGroups, function(key){
        var inputs = $(this).find('input');
        $.each(inputs, function(){
            var inputName = $(this).attr('name'),
                inputValue = $(this).val();
            data[key] = {
                name: inputName,
                value: inputValue
            };
        });
    });

    $.ajax({
        type: "POST",
        url: '/dashboard/locations',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json'
    })
        .success(function(){
            $.post('/postLocationsListPartial', function(data){
                $('#locations_list').empty().append(data);
                $('#create_location_container').empty();
                $('#create_location').prop('disabled', false);
            })
        })
        .error(function(){

        });
});

$(document).on('click', '#cancel_locations', function(){
    $('#create_location_container').empty();
    $('#create_location').prop('disabled', false);
});