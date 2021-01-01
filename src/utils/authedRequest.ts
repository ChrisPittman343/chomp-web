import axios from "axios";
import firebase from "firebase";
import { BASE_URL } from "../constants";

export async function authedRequest(
  user: firebase.User,
  url: string,
  accessToken?: string
) {
  const idToken = await user.getIdToken();
  const ret = axios
    .post(`${BASE_URL}${url}`, undefined, {
      headers: {
        Authorization: `${idToken}`,
        "Access-Token": accessToken ? accessToken : null,
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
