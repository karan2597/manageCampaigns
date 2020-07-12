/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';
import App from './App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/ping', (req, res) => {
    res.json('pong');
  })
  .get('/*', (req, res) => {
    const context = {};
    const sheets = new ServerStyleSheets();
    const markup = renderToString(
      sheets.collect(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>,
      ),
    );
    const css = sheets.toString();
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style id="jss-server-side">${css}</style>
        ${
  assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : ''
}
        ${
  process.env.NODE_ENV === 'production'
    ? `<script src="${assets.client.js}" defer></script>`
    : `<script src="${assets.client.js}" defer crossorigin></script>`
}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`,
      );
    }
  });
export default server;
