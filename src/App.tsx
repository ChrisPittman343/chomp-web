import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { DarkModeContext, UserContext } from "./contexts";
import { toggleColorScheme } from "./utils/toggleColorScheme";
import { Landing } from "./components/landing/Landing";
import { Home } from "./components/home/Home";
import { BasicAuthRoute } from "./components/_common/routes/BasicAuthRoute";
import { ClassAuthRoute } from "./components/_common/routes/ClassAuthRoute";
import { ChompClass } from "./components/class/ChompClass";
import { CreateClass } from "./components/createClass/CreateClass";
import { SolidBtn } from "./components/_common/buttons/SolidBtn";
import { ChompThread } from "./components/thread/ChompThread";
import { CreateThread } from "./components/createThread/CreateThread";
import { auth, functions } from "./firebase";

functions.useEmulator("localhost", 5000);

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
              style={{ position: "fixed", right: 130, top: 10, zIndex: 100 }}
            >
              Toggle Theme
            </SolidBtn>
            <SolidBtn
              onClick={() => auth.signOut()}
              style={{ position: "fixed", top: 10, right: 10, zIndex: 100 }}
            >
              Sign Out
            </SolidBtn>
            <Switch>
              <Route exact path="/" children={<Landing />} />
              <ClassAuthRoute
                path="/class/c/:classId/t/:threadId"
                children={<ChompThread />}
              />
              <ClassAuthRoute
                path="/class/c/:classId/create-thread"
                children={<CreateThread />}
              />
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
