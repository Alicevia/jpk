import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta name="format-detection" content="telephone=no"></meta>
          <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
          {/* 网站描述信息 */}
          <meta name="keywords" content="有道精品课,网易,网易有道,youdao,网易公开课"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    )
  }
}
