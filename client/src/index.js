import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Main";
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from "redux-persist/integration/react";
import { WebSocketProvider, socket } from "./context/websocketContext";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebSocketProvider value={socket}>
          <Main />
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode >
);
