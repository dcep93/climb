import React, { Component } from 'react';

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

function req(url: string, method?: string, body?: any): Promise<Response> {
    return fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .catch(console.error) as Promise<Response>;
}

const input = (c: Component<object, Readonly<any>>, name: string): any => {
    return {
      name,
      value: c.state[name],
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => c.setState({[event.target.name]: event.target.value}),
    };
  }

export default { req, input };
export { commonType, gymType };
