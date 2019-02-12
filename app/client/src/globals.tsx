import React, { Component } from 'react';

window.addEventListener('unhandledrejection', function(event) {
  if (event.reason instanceof ReqError) event.preventDefault();
});

interface commonType {
  path: string,
  google_signin_client_id: string,
  user: any
};

interface gymType {
  id: number,
  path: string,
  name: string,
  description: string
};

class ReqError extends Error {}

function req(url: string, method?: string, body?: any): Promise<Response> {
    return fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
      if (response.status === 404) {
        throw new ReqError(response.statusText);
      }
      return response;
    }) as Promise<Response>;
}

const input = (c: Component<object, Readonly<any>>, name: string): any => {
    return {
      name,
      value: c.state[name],
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => c.setState({[event.target.name]: event.target.value}),
    };
  }

export default { req, input };

// @ts-ignore Type error: Cannot re-export a type when the '--isolatedModules' flag is provided.  TS1205
export { commonType, gymType };
