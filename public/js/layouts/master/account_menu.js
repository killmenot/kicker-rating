$(document).on('click', '.account_menu', function(){
    if($(this).attr('aria-expanded') == 'true'){
        $.post('/postLocationsNamesListPartial', function(data){
            $('.account_append_section').empty().append(data);
        });
    }
});

$(document).on('click', '.user_menu_set_location', function(){
    var locationLink = this,
        locationId = $(locationLink).data('id'),
        checkedExists = $('.account_append_section').children().find('.glyphicon-ok');

    $.post('/dashboard/locations/setLocation', {location_id: locationId}, function(){
        if(checkedExists.length == 1)
        {
            $.each(checkedExists, function(){
                $(this).removeClass('glyphicon glyphicon-ok');
            });
        }

        $(locationLink).addClass('glyphicon glyphicon-ok');
    });
    return false;
});
