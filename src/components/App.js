import { Route, Switch } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Movies from "../pages/Movies";
import SavedMovies from "../pages/SavedMovies";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const App = () => (
  <Switch>
    <Route exact path="/signin">
      <Login />
    </Route>
    <Route exact path="/signup">
      <Register />
    </Route>
    <Route exact path="/movies">
      <Movies />
    </Route>
    <Route exact path="/saved-movies">
      <SavedMovies />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default App;
