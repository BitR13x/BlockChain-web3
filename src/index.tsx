import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, localhost } from "wagmi/chains";

import './scss/index.scss';
import { store } from './store'
import Router from "./router";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#311b92",
      contrastText: '#fff'
    },
    secondary: {
      main: '#1e88e5',
      contrastText: '#fff'
    }
  },
  typography: {
    fontSize: 20
  }
});



async function initApp() {
  const rootElement = document.getElementById('root') as HTMLElement;
  if (!rootElement) throw new Error('Failed to find the root element');
  const root = ReactDOM.createRoot(rootElement)

  const { publicClient, webSocketPublicClient } = configureChains(
    [localhost],
    [publicProvider()]
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });

  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <WagmiConfig config={config}>
          <Provider store={store}>
            <RouterProvider router={Router} />
          </Provider>
        </WagmiConfig>
      </ThemeProvider>
    </React.StrictMode>
  );
}

initApp();