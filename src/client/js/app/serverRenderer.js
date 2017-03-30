import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';

// use the production store as we dont need dev tools
import configureStore from './store/configureStore.production';

export function createServerRenderer(htmlTemplate) {
  return (url) => (
    new Promise((resolve, reject) => {
      const memoryHistory = createMemoryHistory();
      const store = configureStore();
      const history = syncHistoryWithStore(memoryHistory, store);

      const location = history.createLocation(url);
      history.transitionTo({
        ...location,
        action: 'REPLACE',
      });

      match({ routes, location, history }, (error, redirectLocation, renderProps) => {
        if (error) {
          reject(error);
          return;
        }

        if (redirectLocation) {
          const { pathname, search } = redirectLocation;
          const query = search && `?${search}`;
          resolve({ redirect: `${pathname}${query}` });
          return;
        }

        try {
          const appHtml = ReactDOMServer.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>);

          const initialState = store.getState();

          const html = htmlTemplate
            .replace(
              /(window\.__INITIAL_STATE__\s*=\s*){(?:.|\r|\n)*}(;)/,
              `$1${JSON.stringify(initialState)}$2`
            ).replace(
              /(<div\s*id="app">)(<\/div>)/,
              `$1${appHtml}$2`
            );

          resolve({ html });
        } catch (e) {
          reject(e);
        }
      }, reject);
    })
  );
}

