import BrowserRouter from 'react-router-dom/BrowserRouter';
import React, { Suspense } from 'react';
import { hydrate } from 'react-dom';
import App from './App';
import './i18n';

hydrate(
  <BrowserRouter>
    <Suspense fallback={(<div>Loading</div>)}>
      <App />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
