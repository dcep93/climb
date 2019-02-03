$(document).ready(function() {
    $('#new-gym-form').submit(function() {
        $.ajax({
            type: 'post',
            url: '/admin/new_gym',
            data: $(this).serialize(),
            success: function(path) { location.href = path; },
            error: function(response) { alert(response.responseText); }
        });
        return false;
    });
});
