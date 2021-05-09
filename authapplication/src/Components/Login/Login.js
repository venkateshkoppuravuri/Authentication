import React, { useState } from "react";
import { Form } from "react-final-form";
import { Button } from "react-bootstrap";
import App from "../../App";
import { NavLink, Redirect } from "react-router-dom";
import "../../form.scss";
import { Grid } from "@material-ui/core";
import { TextField } from "mui-rff";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const formFields = [
  {
    size: 12,
    field: (
      <TextField
        type="email"
        label="Email"
        name="email"
        margin="none"
        required={true}
        variant="outlined"
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        type="password"
        label="Password"
        name="password"
        margin="none"
        required={true}
        variant="outlined"
      />
    ),
  },
];

const LoginForm = (props) => {
  const [isRedirected, setRedirected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState({});

  const onSubmit = (values) => {
    axios
      .post("https://login-tm2djwog6a-ue.a.run.app/login", values, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        if (response.data.message !== "login sucessful") {
          setErrorMessage(response.data.message);
        } else {
          setResults({ ...response.data });
          setRedirected(true);
        }
      })
      .catch((err) => console.log(err.data));
  };

  if (isRedirected) {
    return (
      <Redirect
        to={{
          pathname: "/home",
          state: { ...results },
        }}
      />
    );
  } else {
    return (
      <App>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            email: "",
            password: "",
          }}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, id) => (
                  <Grid item xs={item.size} key={id}>
                    {item.field}
                  </Grid>
                ))}
                <div className="buttons">
                  <Button type="submit" size="lg" block disabled={submitting}>
                    LOGIN
                  </Button>
                </div>
              </Grid>
              <NavLink to="/signup" className="link">
                <p>Doesn't have an account? Sign up here.</p>
              </NavLink>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </form>
          )}
        />
      </App>
    );
  }
};

export default LoginForm;
