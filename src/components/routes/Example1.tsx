import * as React from 'react';

import { Cells } from 'src/components/blocks/Cells';
import { Columns } from 'src/components/blocks/Columns';
import { Rows } from 'src/components/blocks/Rows';
import { Layout } from 'src/components/wrappers/Layout';

export const Example1: React.SFC = () => (
  <Layout title="Example 1: columns + cells + rows">
    <Columns />
    <Cells />
    <Rows />
  </Layout>
);
