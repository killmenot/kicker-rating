$(document).ready(function(){
    $('.input-daterange').datepicker({
        format: "yyyy-mm-dd",
        clearBtn: true,
        orientation: "auto auto",
        autoclose: true,
        todayHighlight: true
    });

    $('#save_new_season').on('click',function(){
        var self = this;
        $.ajax({
            type:'POST',
            url:'/admin/season',
            data: $(self).parents('form').serialize(),
            success:function() {
                console.log('redirect')
                window.location.href = "/admin";
            },
            error:function(a, b, c ) {
                var error = JSON.parse(a.responseText);
                if (error && error.error) {
                    $('.errors')
                        .text(error.error)
                        .show();
                }
            }
        });
    });
});