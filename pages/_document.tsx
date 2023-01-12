import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon.png" rel="icon" />
          <title>Andrey Keske</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>

        <div id="portal"></div>
        <div id="root"></div>
      </Html>
    );
  }
}

export default MyDocument;
