import "@/styles/globals.css";
import { Inter } from "@next/font/google";

import * as React from "react";

import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
