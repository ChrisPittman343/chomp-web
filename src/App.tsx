import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { firebaseConfig } from "./constants";
import { DarkModeContext, UserContext } from "./contexts";
import { toggleColorScheme } from "./utils/toggleColorScheme";
import { Landing } from "./components/landing/Landing";
import { Home } from "./components/home/Home";
import { BasicAuthRoute } from "./components/_common/routes/BasicAuthRoute";
import { ClassAuthRoute } from "./components/_common/routes/ClassAuthRoute";
import { ChompClass } from "./components/class/ChompClass";
import { CreateClass } from "./components/createClass/CreateClass";
import { SolidBtn } from "./components/_common/buttons/SolidBtn";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (user) {
    //Clear store, so people who log on after you have no chance of getting your data
  } else {
  }
});

firebase.functions().useEmulator("localhost", 5000);

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    toggleColorScheme(darkMode);
    setDarkMode(!darkMode);
  };
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <UserContext.Provider value={{ user, loading, error }}>
        <Router>
          <div className="App">
            <SolidBtn
              onClick={() => toggleDarkMode()}
              style={{ position: "fixed", right: 130, top: 10 }}
            >
              Toggle Theme
            </SolidBtn>
            <SolidBtn
              onClick={() => auth.signOut()}
              style={{ position: "fixed", top: 10, right: 10 }}
            >
              Sign Out
            </SolidBtn>
            <Switch>
              <Route exact path="/" children={<Landing />} />
              <ClassAuthRoute
                path="/class/c/:classId"
                children={<ChompClass user={user} />}
              />
              <BasicAuthRoute
                path="/classes/create-class"
                children={<CreateClass user={user} />}
                routeProps={{ exact: true }}
              />
              <BasicAuthRoute
                path="/classes"
                children={<Home user={user} />}
                routeProps={{ exact: true }}
              />
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </DarkModeContext.Provider>
  );
}

export default App;
