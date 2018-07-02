import * as React from 'react';

import { SimpleBlock } from 'src/components/blocks/SimpleBlock';
import * as styles from './styles.pcss';

export const Columns: React.SFC = () => (
  <>
    <h2>Columns:</h2>

    <div className={styles.columns}>
      <SimpleBlock text="1" />
      <SimpleBlock text="2" />
      <SimpleBlock text="3" />
    </div>
  </>
);
