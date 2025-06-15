import '../styles/globals.css';
import type { AppProps } from 'next/app';
import TopBar from '../components/TopBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopBar />
      <Component {...pageProps} />
    </>
  );
}