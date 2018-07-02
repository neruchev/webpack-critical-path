import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';

import { Html } from 'src/components/wrappers/Html';
import { Router } from 'src/Router';

const app = express();
const port = process.env.PORT || 8000;
const staticDir = path.resolve('static');
const context = {};

app.disable('x-powered-by');
app.use(express.static(staticDir));

app.use((req, res) => {
  const ReactApp = (title?: React.Component) => (
    <Html title={title}>
      <StaticRouter location={req.url} context={context}>
        <Router />
      </StaticRouter>
    </Html>
  );

  renderToString(ReactApp());

  const helmet = Helmet.renderStatic();

  const content = renderToStaticMarkup(ReactApp(helmet.title.toComponent()));
  const html = `<!DOCTYPE html>${content}`;

  res.header('X-Frame-Options', 'Deny');
  res.header('X-XSS-Protection', '1; mode=block');

  res.end(html);
});

app.listen(port, () => console.info(`Server listening on port ${port}`));
