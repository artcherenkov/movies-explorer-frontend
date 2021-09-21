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
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [signedIn, setSignedIn] = useState(false);

  const onSignin = () => {
    setSignedIn(true);
    history.push("/");
  };

  const onSignout = () => {
    setSignedIn(false);
  };

  useEffect(() => {
    if (!signedIn) {
      getUserInfo()
        .then(({ data }) => {
          setCurrentUser(data);
          onSignin();
        })
        .catch(() => history.push("/signin"));
    }
  }, [signedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/signin">
          <Login onSignin={onSignin} />
        </Route>
        <Route exact path="/signup">
          <Register onSignin={onSignin} />
        </Route>
        <ProtectedRoute signedIn={signedIn} exact path="/movies">
          <Movies />
        </ProtectedRoute>
        <ProtectedRoute signedIn={signedIn} exact path="/saved-movies">
          <SavedMovies />
        </ProtectedRoute>
        <ProtectedRoute signedIn={signedIn} exact path="/profile">
          <Profile onSignout={onSignout} />
        </ProtectedRoute>
        <ProtectedRoute signedIn={signedIn} exact path="/">
          <Home />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
};

export default App;
