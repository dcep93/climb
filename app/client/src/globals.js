import { Component } from 'react';

Component.prototype.dReq = (url, method, body) => {
    return fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .catch(console.error);
}

Component.prototype.dInput = (c, name) => {
    return {
      name,
      value: c.state[name],
      onChange: c.handleChange,
    };
  }
