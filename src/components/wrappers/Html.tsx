import * as React from 'react';

interface IOwnProps {
  children: React.ReactChild;
  title?: React.Component;
}

class HtmlImpl extends React.Component<IOwnProps> {
  public render() {
    const { children, title } = this.props;

    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui"
          />
          <style>%CRITICAL_STYLES%</style>

          {title}
        </head>
        <body>
          <div id="root">{children}</div>

          <script src="/load-css.js" async />
          <script src="/client.js" async />
        </body>
      </html>
    );
  }
}

export const Html = HtmlImpl;
