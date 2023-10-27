import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import '@fontsource-variable/nunito'
import theme from "./theme/theme.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { MetaMaskProvider } from '@metamask/sdk-react';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      
        <MetaMaskProvider>
          <ChakraProvider theme={theme}>
            <Provider store={store}>
              <App />
            </Provider>
          </ChakraProvider>
        </MetaMaskProvider>
  </React.StrictMode>
);


