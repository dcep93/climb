$(document).ready(function() {
    $('.wall-climbed-checkbox').change(function() {
        var wallPath = $(this).closest('.wall').attr('href');
        var endpoint = wallPath+'/climb';
        $.post(endpoint, { climbed: this.checked });
    });
});
