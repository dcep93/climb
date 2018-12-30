$(document).ready(function() {
    $('.wall-climbed-checkbox').change(function() {
        var wall_id = $(this).closest('.wall').attr('data-wall-id');
        $.post(location.href+'/'+wall_id+'/climb', { climbed: this.checked });
    });
});
