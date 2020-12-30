import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./constants";
import { ClassesContext, DarkModeContext, UserContext } from "./contexts";
import { toggleColorScheme } from "./utils/toggleColorScheme";
import { Landing } from "./components/landing/Landing";
import { Home } from "./components/home/Home";
import { BasicAuthRoute } from "./components/_common/routes/BasicAuthRoute";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(true);
  const [classes, setClasses] = useState([]);

  // auth.getRedirectResult().then((result) => {
  //   if (result.user) {
  //     //@ts-ignore
  //     const accessToken: string = result.credential.accessToken;
  //     const refreshToken: string = result.user.refreshToken;
  //     axios
  //       .post(`${BASE_URL}/get-classes`, undefined, {
  //         headers: { Authorization: `Bearer ${accessToken} ${refreshToken}` },
  //       })
  //       .then((value) => {
  //         console.log(parseCourseInfo(value.data.courses));
  //         console.log(value.data.students);
  //       });
  //   }
  // });

  const toggleDarkMode = () => {
    toggleColorScheme(darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <UserContext.Provider value={{ user, loading, error }}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" children={<Landing />} />
              <ClassesContext.Provider value={{ classes, setClasses }}>
                <BasicAuthRoute
                  path="/home"
                  children={<Home user={user} />}
                  routeProps={{ exact: true }}
                />
              </ClassesContext.Provider>
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </DarkModeContext.Provider>
  );
}

export default App;
