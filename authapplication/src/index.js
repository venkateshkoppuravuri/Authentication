import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ClientRoute from "./Routes/index";
import LoginForm from "./Components/Login/Login";

ReactDOM.render(
  <React.StrictMode>
    <ClientRoute>
      <LoginForm />
    </ClientRoute>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
