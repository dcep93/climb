function submit() {
    var form = $(this);

    var file = form.find('input[name=upload]').get()[0].files[0];

    var mime = file.type.split("/")[0];

    var acceptableMedia = ["image", "video"];

    if (acceptableMedia.indexOf(mime) === -1) return alert('invalid file');

    $.get('/get_gcs_key', function(response) {
        var gcsKey = response.token;
        var folder = response.folder;
        var bucket = response.bucket;

        var name = folder+'/'+(new Date().getTime())+'_'+file.name;
        var endpoint = 'https://www.googleapis.com/upload/storage/v1/b/'+bucket+'/o?uploadType=media&name='+name;
        $.post({
            url: endpoint,
            headers: {
                'Authorization': 'Bearer '+gcsKey,
                'Content-Type': file.type,
                // 'Content-Length': file.size,
            },
            data: file,
            processData: false,
            success: function(data) {
                $.post(form.attr('action'), {
                    gcs_path: data.name,
                    gcs_id: data.id,
                    mime: file.type,
                    size: file.size,
                    gcs_key: gcsKey,
                }, refresh);
            }
        });
    });

    return false;
}

$(document).ready(function() {
    var uploadForm = $('#upload_form');

    uploadForm.submit(submit);
});
