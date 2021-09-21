import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => (
  <Route {...props}>
    {() => (props.signedIn ? props.children : <Redirect to="/" />)}
  </Route>
);

export default ProtectedRoute;
