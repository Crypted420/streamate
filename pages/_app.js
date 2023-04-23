import Head from 'next/head'
import '../styles/globals.css'
import { ContextProvider } from '../components/SocketContext'

function MyApp({ Component, pageProps }) {

  return <>
    <Head>
      <title>StreamMate</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  </>
}

export default MyApp
