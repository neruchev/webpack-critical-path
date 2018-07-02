import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from 'src/constants/routes';

export const Menu: React.SFC = () => (
  <nav>
    <ul>
      <li>
        <NavLink to={ROUTES.EXAMPLE_1}>Example 1</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.EXAMPLE_2}>Example 2</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.EXAMPLE_3}>Example 3</NavLink>
      </li>
    </ul>
  </nav>
);
