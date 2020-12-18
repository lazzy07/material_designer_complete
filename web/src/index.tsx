import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GRAPHQL_URL, REFRESH_TOKEN_URL } from "./constants";
import { ApolloProvider } from "@apollo/react-components";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { loginUser, logoutUser } from "./redux/actions/UserActions";
import { parseSessionToken } from "./services/ParseJWT";
import Axios from "axios";

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
          store.dispatch(loginUser(saveData as any));
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
          operation.setContext({
            headers: {
              authorization:
                store.getState().user.sessionId !== ""
                  ? "bearer " + store.getState().user.sessionId
                  : ""
            }
          });
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
        store.dispatch(loginUser(saveData as any));
      },
      handleError: err => {
        // full control over handling token fetch Error
        console.warn("Your refresh token is invalid. Try to relogin");
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
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { client };
