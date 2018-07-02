import * as React from 'react';

import * as styles from './styles.pcss';

interface IOwnProps {
  text: number | string;
}

export const SimpleBlock: React.SFC<IOwnProps> = ({ text }) => (
  <div className={styles.simpleBlock}>{text}</div>
);
