import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Menu } from 'src/components/blocks/Menu';
import * as styles from './styles.pcss';

interface IOwnProps {
  children: React.ReactChild[];
  title: string;
}

class LayoutImpl extends React.Component<IOwnProps> {
  public render() {
    const { children, title } = this.props;

    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <header className={styles.header}>
          <Menu />
        </header>

        <main className={styles.main}>
          <h1>{title}</h1>

          {children}
        </main>
      </>
    );
  }
}

export const Layout = LayoutImpl;
