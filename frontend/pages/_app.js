import Head from "next/head";
import React from "react";
import "../styles/bootstrap/bootstrap.min.css";
import "../styles/nprogress/nprogress.min.css";
import "../styles/quill/quill.snow.css";
import "../styles/global.scss";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
