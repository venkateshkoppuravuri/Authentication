import React, { useState } from "react";
import { Form } from "react-final-form";
import { Button } from "react-bootstrap";
import App from "../../App";
import { NavLink, Redirect } from "react-router-dom";
import "../../form.scss";
import { Grid, MenuItem } from "@material-ui/core";
import CountryList from "../Country/Country";
import { TextField, Select } from "mui-rff";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  return errors;
};

const formFields = [
  {
    size: 12,
    field: (
      <TextField
        type="text"
        label="Name"
        name="name"
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
  {
    size: 12,
    field: (
      <Select name="country" label="Select a Country" variant="outlined">
        {CountryList.map((country, index) => (
          <MenuItem value={country} key={index}>
            {country}
          </MenuItem>
        ))}
      </Select>
    ),
  },
];

const SignUpForm = () => {
  const [isRedirected, setRedirected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = (values) => {
    axios
      .post("https://registration-tm2djwog6a-ue.a.run.app/register", values, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.message !== "user created sucessfully") {
          setErrorMessage(response.data.message);
        } else {
          setRedirected(true);
        }
      })
      .catch((err) => console.log(err.data));
  };

  if (isRedirected) {
    return <Redirect to="/login" />;
  } else {
    return (
      <App>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            email: "",
            password: "",
            name: "",
            country: "",
          }}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container alignItems="flex-start" spacing={2}>
                {formFields.map((item, id) => (
                  <Grid item xs={item.size} key={id}>
                    {item.field}
                  </Grid>
                ))}
                <div className="buttons">
                  <Button type="submit" size="lg" block>
                    SIGN UP
                  </Button>
                </div>
              </Grid>
              <NavLink to="/login" className="link">
                <p>Already have an account? Login here.</p>
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

export default SignUpForm;
