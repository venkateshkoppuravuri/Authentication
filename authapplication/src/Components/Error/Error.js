import React from "react";
import classes from "./Error.css";

class Error extends React.Component {
  render() {
    return (
      <div>
        <div className={classes.Error}>
          {"Page Not Found...Please Check the url or go back"}
        </div>
      </div>
    );
  }
}

export default Error;
