import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import {SessionProvider} from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <RecoilRoot>
          <SessionProvider session={pageProps?.session}>
            <Component {...pageProps} />
          </SessionProvider>
      </RecoilRoot>
  )
}

export default MyApp
