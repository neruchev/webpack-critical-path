import * as React from 'react';

import { Cells } from 'src/components/blocks/Cells';
import { Columns } from 'src/components/blocks/Columns';
import { Layout } from 'src/components/wrappers/Layout';

export const Example2: React.SFC = () => (
  <Layout title="Example 2: cells + columns">
    <Cells />
    <Columns />
  </Layout>
);
