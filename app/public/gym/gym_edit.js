$(document).ready(function() {
    $('.update-form').bind('input', function() {
        $(this).attr('status', 'edited');
    });

    $('.update-form').submit(function(e) {
        var endpoint = $(this).attr('action');
        $(this).attr('status', 'updating');
        $.post(endpoint, $(this).serialize(), (function() { $(this).removeAttr('status'); }).bind(this));
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
