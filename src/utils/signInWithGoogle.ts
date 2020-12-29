import firebase from "firebase";

/**
 * Redirects to the Google sign in page.
 * Errors should be handled in auth.getRedirectResult()
 */
export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope(
    "https://www.googleapis.com/auth/classroom.courses.readonly"
  );
  provider.addScope(
    "https://www.googleapis.com/auth/classroom.rosters.readonly"
  );
  provider.addScope("https://www.googleapis.com/auth/classroom.profile.emails");
  provider.addScope("https://www.googleapis.com/auth/classroom.profile.photos");
  await firebase.auth().signInWithRedirect(provider);
}
