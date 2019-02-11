window.req = (url, method, body) => {
    return fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .catch(console.error);
}
