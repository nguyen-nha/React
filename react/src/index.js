import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js'
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header";
import AuthenticationRoute from "./components/auth/authentication_route";
import ProviderAuth from "./components/auth/auth";

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const routing = (
  <ProviderAuth>
    <Router>
      <React.StrictMode>
        <Header />
        <AuthenticationRoute />
      </React.StrictMode>
    </Router>
  </ProviderAuth>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
