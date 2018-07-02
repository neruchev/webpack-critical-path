import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Router } from 'src/Router';

const ReactApp = (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

ReactDOM.render(ReactApp, document.getElementById('root'));
