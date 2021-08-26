import { Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Movies from "../pages/Movies";
import SavedMovies from "../pages/SavedMovies";
import Profile from "../pages/Profile";
import Home from "../pages/Home";

const App = () => (
  <Switch>
    <Route path="/signin">
      <Login />
    </Route>
    <Route path="/signup">
      <Register />
    </Route>
    <Route path="/movies">
      <Movies />
    </Route>
    <Route path="/saved-movies">
      <SavedMovies />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default App;
