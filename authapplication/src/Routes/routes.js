import Error from "../Components/Error/Error";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";

const routes = [
  {
    path: "/signup",
    exact: true,
    component: Signup,
  },
  {
    path: "/home",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/*",
    component: Error,
  },
];

export default routes;
