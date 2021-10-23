import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../utils/createTheme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { store } from "../store";
import { Provider } from "react-redux";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/utils";

const clientSideEmotionCache = createEmotionCache();

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

type Props = AppProps & { emotionCache: EmotionCache };

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: Props) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Ethereum Faucet</title>
        <meta name="description" content="Faucet for ethereum testnets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Provider store={store}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
          </Web3ReactProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
