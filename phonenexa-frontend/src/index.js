import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from "react-modal";
import { store } from "./redux/store";
import { UserContextProvider } from "contexts/userContext";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#742EEE',
    },
  },
});

// Additional styles for a more beautiful scrollbar
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 6px;
    border: 1px solid #f1f1f1; /* border around the thumb */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #742eee;
  }

::-webkit-scrollbar-thumb:horizontal {
  min-width: 10px;
}

::-webkit-scrollbar-thumb:vertical {
  min-height: 10px;
}
`;

// Set the app element for the modal
Modal.setAppElement("#root");

const test_clientId = "575759736502-3f7d87h102hpb6f21e5nu6dj39pbjbb9.apps.googleusercontent.com";
const user_clientId = "575759736502-mc6ps279md9bqb9cqqocdfa5i6rohj4e.apps.googleusercontent.com";
// Create a root element and render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <UserContextProvider>
    {/* <GoogleOAuthProvider clientId={test_clientId}> */}
    <GoogleOAuthProvider clientId={user_clientId}>
      <ThemeProvider theme={theme}>
        <style>{scrollbarStyles}</style>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </UserContextProvider>
);
