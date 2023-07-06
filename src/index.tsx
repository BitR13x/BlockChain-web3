import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './scss/index.scss';
import App from './App';
import Dashboard from "./pages/Dashboard";
import NoMatch from "./components/NoMatch";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store'

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

  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              {/* 
              @ts-ignore */}
              <Route path="/" element={<App />} exact />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

initApp();