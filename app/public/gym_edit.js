$(document).ready(function() {
    $('form.wall-update-form').bind('input', function() {
        $(this).css('border-color', 'red');
    });

    $('form.wall-update-form').submit(function(e) {
        var wall_id = $(this).closest('.wall').attr('data-wall-id');
        var endpoint = 'wall/'+wall_id;
        $(this).css('border-color', 'yellow');
        $.post(endpoint, $(this).serialize(), (function() { $(this).css('border-color', ''); }).bind(this));
        return false;
    });

    $('#new-wall-form').submit(function(e) {
        $(this).css('border-color', 'yellow');
        $.post('new_wall', $(this).serialize(), refresh);
        return false;
    });

    var dateParts = new Date().toLocaleDateString('en-US').split('/');
    if (dateParts[0].length === 1) dateParts[0] = '0'+dateParts[0];
    if (dateParts[1].length === 1) dateParts[1] = '0'+dateParts[1];
    var today = dateParts[2]+'-'+dateParts[0]+'-'+dateParts[1];
    $('#new-wall-form input[name=date]').val(today);
});
