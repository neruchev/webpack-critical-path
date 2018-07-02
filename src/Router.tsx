import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Example1 } from 'src/components/routes/Example1';
import { Example2 } from 'src/components/routes/Example2';
import { Example3 } from 'src/components/routes/Example3';
import { ROUTES } from 'src/constants/routes';

export const Router = () => (
  <Switch>
    <Route exact path={ROUTES.EXAMPLE_1} component={Example1} />
    <Route exact path={ROUTES.EXAMPLE_2} component={Example2} />
    <Route exact path={ROUTES.EXAMPLE_3} component={Example3} />
  </Switch>
);
