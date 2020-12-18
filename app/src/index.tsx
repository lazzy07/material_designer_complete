import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { rendererStore, store } from "./redux/store";
import Axios from "axios";
import { REFRESH_TOKEN_URL, GRAPHQL_URL } from "./constants";
import { parseSessionToken } from "./services/jwt/ParseJwt";
import { loginUser, logoutUser } from "./redux/actions/UserActions";
import jwtDecode from "jwt-decode";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, Observable } from "apollo-link";
import { ApolloProvider } from "@apollo/react-components";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";

const cookie = localStorage.getItem("cookie");

if (cookie) {
  const jid = JSON.parse(cookie);
  (window as any)
    .require("electron")
    .remote.session.defaultSession.cookies.set(
      { url: "http://localhost:3000", ...jid },
      err => {
        if (err) {
          console.log(err);
          return;
        }

        Axios.post(REFRESH_TOKEN_URL, {}, { withCredentials: true }).then(
          res => {
            const saveData = parseSessionToken(res.data.accessToken);
            store.dispatch(
              loginUser({ ...saveData, sessionId: res.data.accessToken } as any)
            );
          }
        );
      }
    );
}

Axios.interceptors.request.use(async request => {
  if (store.getState().user.sessionId !== "") {
    let token: any = jwtDecode(store.getState().user.sessionId);

    if (Date.now() > token.exp * 1000) {
      try {
        const res = await fetch(REFRESH_TOKEN_URL, {
          method: "POST",
          credentials: "include"
        });

        const data = await res.json();

        if (!data.error) {
          request.headers.authorization = "bearer " + data.accessToken;
          const saveData = parseSessionToken(data.accessToken);
          store.dispatch(
            loginUser({ ...saveData, sessionId: data.accessToken } as any)
          );
          return request;
        }
      } catch (err) {
        return request;
      }
      return request;
    }
  }
  return request;
});

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(operation => {
          const token = store.getState().user.sessionId;
          if (token) {
            operation.setContext({
              headers: {
                authorization:
                  store.getState().user.sessionId !== ""
                    ? "bearer " + store.getState().user.sessionId
                    : ""
              }
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = store.getState().user.sessionId;
        if (token !== "") {
          return true;
        }

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch(REFRESH_TOKEN_URL, {
          method: "POST",
          credentials: "include"
        });
      },
      handleFetch: accessToken => {
        const saveData = parseSessionToken(accessToken);
        store.dispatch(
          loginUser({ ...saveData, sessionId: accessToken } as any)
        );
      },
      handleError: err => {
        // full control over handling token fetch Erroer
        console.warn("Your refresh token is invalid. Try to re-login");
        console.error(err);

        store.dispatch(logoutUser());
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: GRAPHQL_URL,
      credentials: "include"
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={rendererStore()}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

export { client };
