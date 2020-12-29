import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { BASE_URL, firebaseConfig } from "./constants";
import { DarkModeContext, UserContext } from "./contexts";
import { toggleColorScheme } from "./utils/toggleColorScheme";
import axios from "axios";
import { parseCourseInfo } from "./utils/parseData";
import { Landing } from "./components/landing/Landing";
import { Home } from "./components/home/Home";
import { BasicAuthRoute } from "./components/_common/routes/BasicAuthRoute";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(false);

  auth.getRedirectResult().then((result) => {
    if (result.user) {
      //@ts-ignore
      const accessToken: string = result.credential.accessToken;
      //const refreshToken: string = result.user.refreshToken;
      axios
        .post(`${BASE_URL}/get-classes`, undefined, {
          headers: { Authorization: accessToken },
        })
        .then((value) => {
          console.log(parseCourseInfo(value.data.courses));
          console.log(value.data.students);
        });
    }
  });

  const toggleDarkMode = () => {
    toggleColorScheme(darkMode);
    setDarkMode(!darkMode);
  };

  const createUserDocument = async () => {
    firestore
      .collection("users")
      .doc(user.uid)
      .set(
        {
          uid: user.uid,
          classes: firebase.firestore.FieldValue.arrayUnion({
            name: "Physics",
            role: "Assistant",
          }),
        },
        { merge: true }
      )
      .then(() => console.log("Document Set!"));
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <UserContext.Provider value={{ user, loading, error }}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" children={<Landing />} />
              <BasicAuthRoute
                path="/home"
                children={<Home />}
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
