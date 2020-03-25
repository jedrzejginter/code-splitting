import { css, Global } from '@emotion/core';
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps = Document.getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <Global styles={css`
            html { font-size: 62.5% }
            body { font-size: 1.6rem }
            *, *:after, *:before { box-sizing: border-box }
          `} />
        </Head>
        <body>
          <div id="modal-root" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
