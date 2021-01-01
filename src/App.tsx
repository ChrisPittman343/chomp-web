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
import { ClassAuthRoute } from "./components/_common/routes/ClassAuthRoute";
import { ChompClass } from "./components/class/ChompClass";
import { CreateClass } from "./components/createClass/CreateClass";
import { SolidBtn } from "./components/_common/buttons/SolidBtn";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(true);
  const [classes, setClasses] = useState([]);

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
              onClick={() => auth.signOut()}
              style={{ position: "absolute", top: 10, right: 10 }}
            >
              Sign Out
            </SolidBtn>
            <Switch>
              <Route exact path="/" children={<Landing />} />
              <ClassesContext.Provider value={{ classes, setClasses }}>
                <BasicAuthRoute
                  path="/classes"
                  children={<Home user={user} />}
                  routeProps={{ exact: true }}
                />
                <BasicAuthRoute
                  path="/classes/create-class"
                  children={<CreateClass user={user} />}
                  routeProps={{ exact: true }}
                />
                <ClassAuthRoute
                  path="/classes/c/:classId"
                  children={<ChompClass />}
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
