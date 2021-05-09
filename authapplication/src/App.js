import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {
  return <div className="app">{props.children}</div>;
}

export default App;
