function submit() {
    var form = $(this);
    var file = form.find('input[name=upload]').get()[0].files[0];

    var reader = new FileReader();
    reader.onload = function(e) {
        var fileData = e.target.result;
        $.get('/get_gcs_key', function(response) {
            var name = response.folder+'/'+(new Date().getTime())+'_'+file.name;
            var endpoint = 'https://www.googleapis.com/upload/storage/v1/b/'+response.bucket+'/o?uploadType=media&name='+name;
            $.post({
                url: endpoint,
                headers: {
                    'Authorization': 'Bearer '+response.token,
                    'Content-Type': file.type,
                    // 'Content-Length': file.size,
                },
                data: fileData,
                processData: false,
                success: function(data) {
                    $.post(form.attr('action'), {
                        gcs_path: data.name,
                        gcs_id: data.id,
                        mime: file.type,
                    }, function() { location.href = location.href; })
                }
            });
        });
    }
    reader.readAsArrayBuffer(file);
}

$(document).ready(function() {
    var uploadForm = $('#upload_form');

    uploadForm.submit(function() {
        setTimeout(submit.bind(this));
        return false;
    });
});