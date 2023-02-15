import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import { AuthProvider } from '../contexts/auth';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;