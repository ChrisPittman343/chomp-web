import axios from "axios";
import firebase from "firebase";
import { BASE_URL } from "../constants";
import { NO_LOGIN } from "../types/errors";

export async function authedRequest(url: string, accessToken?: string) {
  const idToken = await firebase.auth().currentUser?.getIdToken(true);
  if (!idToken) throw NO_LOGIN;
  const ret = axios
    .post(`${BASE_URL}${url}`, undefined, {
      headers: {
        Authorization: `${idToken}`,
        "Access-Token": accessToken,
      },
    })
    .then((value) => {
      return value;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return ret;
}
