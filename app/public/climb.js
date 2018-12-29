function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.post('/login', {id_token: id_token}, signIn);
}

function signIn(data) {
    console.log('success');
    console.log(data);
}

function signOut() {
    $.post('/logout');
    gapi.auth2.getAuthInstance().signOut();
}

$(document).ready(function() {
    $('#sign-in-button').hide();
});
