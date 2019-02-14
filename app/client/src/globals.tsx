import React, { Component } from 'react';

window.addEventListener('unhandledrejection', function(event) {
  if (event.reason instanceof ReqError) event.preventDefault();
});

interface userType {
  id?: number,
  is_admin?: boolean,
  is_verified?: boolean,
  name?: string,
  image?: string,
};

interface commonType {
  path: string,
  google_signin_client_id: string,
  user: userType,
};

interface gymType {
  id: number,
  path: string,
  name: string,
  description: string,
};

interface wallType {
  id: number,
  name: string,
  difficulty: string,
  location: string,
  date: string,
  setter: string,
  active: boolean,
  color: string,
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
      if (response.status >= 400) throw new ReqError(response.statusText);
      return response;
    })
    .catch(err => {
      return Promise.reject(new ReqError(err));
    }) as Promise<Response>;
}

enum InputType {
  Text = "text",
  Checkbox = "checkbox",
}

const inputTypeToField = {
  [InputType.Text]: "value",
  [InputType.Checkbox]: "checked",
};

const input = (c: Component<object, Readonly<any>>, name: string, type?: InputType) => {
    var field = (type === undefined) ? "value" : inputTypeToField[type];
    return {
      name,
      type: type,
      [field]: c.state[name],
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        var t: any = event.target;
        var state = {[event.target.name]: t[field]};
        c.setState(state);
        return state;
      },
    };
  }

const err = console.error;

var refreshF: () => void;

const refresh = (): void => {
  refreshF();
}

const setRefresh = (_refreshF: typeof refreshF) => {
  refreshF = _refreshF;
}

export default { req, input, err, refresh, setRefresh };

// @ts-ignore Type error: Cannot re-export a type when the '--isolatedModules' flag is provided.  TS1205
export { commonType, userType, gymType, wallType, InputType };
