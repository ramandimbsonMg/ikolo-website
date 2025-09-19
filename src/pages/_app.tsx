import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <ProgressBar
      height="3px"
      color="#2dd4bf"
      options={{ showSpinner: false }}
      shallowRouting
    />
  </>
}
