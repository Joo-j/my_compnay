import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>🧭 회사 도우미</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-white text-gray-800">
        <Component {...pageProps} />
      </main>
    </>
  );
}