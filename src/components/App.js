import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Movies from "../pages/Movies";
import SavedMovies from "../pages/SavedMovies";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getUserInfo } from "../utils/MainApi";

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    getUserInfo()
      .then(({ data }) => setCurrentUser(data))
      .catch(() => history.push("/signin"));
  }, [signedIn]);

  const onSignin = () => {
    history.push("/");
    setSignedIn(true);
  };

  const onSignout = () => {
    history.push("/signin");
    setSignedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/signin">
          <Login onSignin={onSignin} />
        </Route>
        <Route exact path="/signup">
          <Register onSignin={onSignin} />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/profile">
          <Profile onSignout={onSignout} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
};

export default App;
