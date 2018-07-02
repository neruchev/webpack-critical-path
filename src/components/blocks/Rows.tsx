import * as React from 'react';

import { SimpleBlock } from 'src/components/blocks/SimpleBlock';
import * as styles from './styles.pcss';

export const Rows: React.SFC = () => (
  <>
    <h2>Rows:</h2>

    <div className={styles.rows}>
      <SimpleBlock text="1" />
      <SimpleBlock text="2" />
      <SimpleBlock text="3" />
    </div>
  </>
);
