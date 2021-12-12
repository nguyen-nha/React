import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BarChart from "../bar_chart";
import History from "../history_table";
import Login from "../login";
import Logout from "../logout";
import Register from "../register";
import App from "../../App";

import { AuthContext } from "./auth";

const AuthenticationRoute = (props) => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log("auth: ", auth);
  }, [auth]);

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  const PrivateRoute = ({ children }) => {
    return auth?.token || localStorage.getItem("refresh_token") ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  const OutPrivateRoute = ({ children, location }) => {
    return !auth.token ? children : <Navigate to={location} />;
  };

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />
      <Route
        path="/bar-chart"
        element={
          <PrivateRoute>
            <BarChart />
          </PrivateRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <OutPrivateRoute location={"/bar-chart"}>
            <Login />
          </OutPrivateRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default AuthenticationRoute;
