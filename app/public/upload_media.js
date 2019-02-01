function submit() {
    alert("Not implemented yet");
}

$(document).ready(function() {
    var uploadForm = $('#upload_form');

    uploadForm.submit(function() {
        setTimeout(submit.bind(this));
        return false;
    });
});
