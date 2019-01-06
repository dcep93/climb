$(document).ready(function() {
    $('.wall-climbed-checkbox').change(function() {
        var wall_id = $(this).closest('.wall').attr('data-wall-id');
        var endpoint = location.href+'/'+wall_id+'/climb';
        $.post(endpoint, { climbed: this.checked });
    });

    $('.wall').attr('href', function() { 
        return location.href+'/wall/'+$(this).attr('data-wall-id');
    });
});
