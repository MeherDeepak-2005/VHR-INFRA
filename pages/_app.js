import '../styles/globals.css'
import { ChakraProvider,CSSReset,Box } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';


function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    <CSSReset />
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  </ChakraProvider>
}

export default MyApp
