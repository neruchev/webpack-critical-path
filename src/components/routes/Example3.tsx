import * as React from 'react';

import { Cells } from 'src/components/blocks/Cells';
import { Rows } from 'src/components/blocks/Rows';
import { Layout } from 'src/components/wrappers/Layout';

export const Example3: React.SFC = () => (
  <Layout title="Example 3: cells + rows">
    <Cells />
    <Rows />
  </Layout>
);
