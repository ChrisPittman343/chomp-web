import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from "./components/_common/Footer";
import { Index } from "./components/index/Index";
import { IndexNavbar } from "./components/index/IndexNavbar";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./constants";
import { DarkModeContext, UserContext } from "./contexts";
import { toggleColorScheme } from "./utils/toggleColorScheme";
import axios from "axios";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(false);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope(
      "https://www.googleapis.com/auth/classroom.courses.readonly"
    );
    provider.addScope(
      "https://www.googleapis.com/auth/classroom.rosters.readonly"
    );
    provider.addScope(
      "https://www.googleapis.com/auth/classroom.profile.emails"
    );
    provider.addScope(
      "https://www.googleapis.com/auth/classroom.profile.photos"
    );
    auth.signInWithRedirect(provider).then((value) => {
      console.log(value);
    });
  };

  const toggleDarkMode = () => {
    toggleColorScheme(darkMode);
    setDarkMode(!darkMode);
  };

  auth.getRedirectResult().then((result) => {
    if (result.user) {
      //@ts-ignore
      const accessToken: string = result.credential.accessToken;
      const refreshToken: string = result.user.refreshToken;
      axios
        .post(
          "https://us-central1-chomp-chat.cloudfunctions.net/widgets/get-classes",
          {},
          {
            headers: { Authorization: accessToken },
          }
        )
        .then((value) => {
          console.log(value);
        });
    }
  });

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <UserContext.Provider value={{ user, loading, error }}>
        <Router>
          <div className="App">
            <Switch>
              <Route
                exact
                path="/"
                children={
                  <>
                    <IndexNavbar />
                    {user ? (
                      <>
                        Currently Signed in as: {user.email}
                        <br />
                        <button onClick={() => auth.signOut()}>Sign Out</button>
                      </>
                    ) : (
                      <button onClick={() => signInWithGoogle()}>
                        Sign in with Google
                      </button>
                    )}
                    <Index />
                  </>
                }
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </UserContext.Provider>
    </DarkModeContext.Provider>
  );
}

export default App;
