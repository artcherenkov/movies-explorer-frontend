import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import SavedMovies from "../pages/SavedMovies";
import Movies from "../pages/Movies";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getUserInfo } from "../utils/MainApi";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import {
  getUserInfoFromStorage,
  removeUserInfoFromStorage,
  setUserInfoInStorage,
} from "../utils/storage";

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState();
  const [signedIn, setSignedIn] = useState(false);

  const redirectOnSignin = () => {
    const lastLocation = location.pathname;
    if (lastLocation === "/signin" || lastLocation === "/signup") {
      return history.push("/movies");
    }
    return history.push(lastLocation);
  };

  const onSignin = () => {
    getUserInfo()
      .then(({ data }) => {
        setSignedIn(true);
        setCurrentUser(data);
        setUserInfoInStorage(data);
        redirectOnSignin();
      })
      .catch((err) => console.log(err));
  };

  const onSignout = () => {
    removeUserInfoFromStorage();
    setSignedIn(false);
    setCurrentUser(null);
  };

  const onUserInfoChange = ({ data }) => {
    setCurrentUser(data);
    setUserInfoInStorage(data);
  };

  useEffect(() => {
    if (!signedIn) {
      const fromStorage = getUserInfoFromStorage();
      if (fromStorage) {
        setCurrentUser(fromStorage);
        setSignedIn(true);
        redirectOnSignin();
        return;
      }

      getUserInfo()
        .then(({ data }) => {
          setCurrentUser(data);
          setUserInfoInStorage(data);
          setSignedIn(true);
        })
        .catch((err) => console.log(err));
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
          <Profile onSignout={onSignout} onUserInfoChange={onUserInfoChange} />
        </ProtectedRoute>
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
