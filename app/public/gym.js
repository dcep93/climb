$(document).ready(function() {
    $('.wall-climbed-checkbox').change(function() {
        var wall_id = $(this).closest('.wall').attr('data-wall-id');
        var endpoint = location.href+'/'+wall_id+'/climb';
        $.post(endpoint, { climbed: this.checked });
    });

    $('form.wall-update-form').bind('input', function() {
        $(this).css('border-color', 'red');
    });

    $('form.wall-update-form').submit(function(e) {
        var wall_id = $(this).closest('.wall').attr('data-wall-id');
        var endpoint = location.href+'/'+wall_id+'/edit';
        $(this).css('border-color', 'yellow');
        $.post(endpoint, $(this).serialize(), (function() { $(this).css('border-color', ''); }).bind(this));
        return false;
    });

    $('form.new-wall-form').submit(function(e) {
        var endpoint = location.href+'/new';
        $(this).css('border-color', 'yellow');
        $.post(endpoint, $(this).serialize(), refresh);
        return false;
    });

    var dateParts = new Date().toLocaleDateString('en-US').split('/');
    var today = dateParts[2]+'-'+dateParts[0]+'-'+dateParts[1];
    $('form.new-wall-form input[name=date]').val(today);
});
