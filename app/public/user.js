$(document).ready(function() {
    $('.user-field-input').change(function() {
        var field = $(this).attr('data-field');
        var value = $(this).is(':checked');
        $.post(location.href+'/edit', { field: field, value: value }, refresh);
    });
});