$(document).on('click', '#create_location', function(){
	$('#create_location_container').removeClass('hidden');
});

$(document).on('click', '#add_more_locations', function(){
	var counter = $(this).data('counter') + 1,
	element = $(this);
	//console.log(counter);
	$.post('/postLocationsAdd', {counter: counter}, function(data){
		//element.remove();
		element.remove();
		$('#create_location_group').append(data);
	});
});

$(document).on('click', '#remove_current_location', function(){
	$(this).closest('.form-group').remove();
});

$(document).on('click', '#cancel_locations', function(){
	$('#create_location_container').addClass('hidden');
});