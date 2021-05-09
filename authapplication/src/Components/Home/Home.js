import React, { Fragment, useState } from "react";
import "./Home.scss";
import { Button, Table } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  const [isRedirected, setRedirected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);

  const logoutHandler = (event) => {
    const userId = event.target.value;
    const user = { userId: userId };

    axios
      .post("https://users-tm2djwog6a-ue.a.run.app/logout", user, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        if (response.data.message === "User is offline") {
          setRedirected(true);
        }
      })
      .catch((err) => console.log(err.data));
  };

  const getUsersHandler = (event) => {
    const userId = event.target.value;
    const user = { userId: userId };
    axios
      .post("https://users-tm2djwog6a-ue.a.run.app/users", user, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        if (response.data.message === "All other users are offline") {
          setErrorMessage("All other users are offline");
        } else {
          setErrorMessage("");
          setUsers(response.data.users);
        }
      })
      .catch((err) => console.log(err.data));
  };
  if (isRedirected) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Fragment>
        <div className="logout">
          <Button
            outline
            color="primary"
            value={props.location.state.userId}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </div>
        <div className="home">
          <p>Hi {props.location.state.name}. You are logged in...</p>
          <div>User Id:{props.location.state.userId}</div>
          <div>Email: {props.location.state.email}</div>
        </div>
        <div className="users">
          <div className="heading">
            <div>Users who are online</div>
            <div>
              <Button
                outline
                color="success"
                value={props.location.state.userId}
                onClick={getUsersHandler}
              >
                Show Users
              </Button>
            </div>
          </div>
          {errorMessage && (
            <div className="alert alert-danger error" role="alert">
              {errorMessage}
            </div>
          )}
          {users.length > 0 && !errorMessage && (
            <Table responsive>
              <thead>
                <tr>
                  <th>User Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Fragment>
    );
  }
};

export default Home;
