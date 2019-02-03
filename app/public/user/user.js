$(document).ready(function() {
    var userPath = $('#user').attr('path');
    $('.user-field-input').change(function() {
        var field = $(this).attr('data-field');
        var value = $(this).is(':checked');
        $.post('/admin'+userPath+'/edit', { field: field, value: value }, refresh);
    });
});