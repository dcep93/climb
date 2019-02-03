function onSignIn(googleUser) {
    if (loggedIn()) return;
    var id_token = googleUser.getAuthResponse().id_token;
    var refreshLock = lock(refresh, 2);
    $.post('/auth/login', {id_token: id_token}, refreshLock);
    refreshLock();
}

function lock(f, times) {
    var remaining = times;
    return function() {
        if (--remaining === 0) f();
    }
}

function refresh() {
    location.reload();
}

function signOut() {
    var refreshLock = lock(refresh, 2);
    $.post('/auth/logout', undefined, refreshLock);
    gapi.auth2.getAuthInstance().signOut();
    refreshLock();
}

function loggedIn() {
    return $('meta[name=is-signed-in]').attr('content') === 'true';
}
