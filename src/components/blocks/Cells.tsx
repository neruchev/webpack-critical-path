import * as React from 'react';

import { SimpleBlock } from 'src/components/blocks/SimpleBlock';
import * as styles from './styles.pcss';

export const Cells: React.SFC = () => (
  <>
    <h2>Cells:</h2>

    <div className={styles.cells}>
      {Array(30)
        .fill(0)
        .map((item, index) => <SimpleBlock text={index + 1} />)}
    </div>
  </>
);
