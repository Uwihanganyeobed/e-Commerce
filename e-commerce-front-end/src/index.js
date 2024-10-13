import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./Context/CartContex";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <Auth0Provider
    domain="dev-t4uzno01ejqc7mg4.us.auth0.com"
    clientId="OE3Wc0qJYmWrnsm1wzDqWL3cswDy0vB4"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <CartProvider>
      <div id="root">
        <App />
      </div>
    </CartProvider>
  </Auth0Provider>
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
