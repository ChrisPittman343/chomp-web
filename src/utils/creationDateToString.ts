import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";

/**
 * Returns an appropriate timestamp for the creation date of a thread. Value will follow this flow:
 *
 * Just now, Seconds ago, Minutes ago, Hours ago, Weekday, Month Day, Year
 *
 * @param thread
 */
export function creationDateToString(timestamp: firebase.firestore.Timestamp) {
  const currentDate = moment(new Date());
  const createdDate = moment(timestamp.toDate());
  const sd = currentDate.diff(createdDate, "seconds");

  let final: number;
  const f = (num: number) => {
    final = Math.floor(num);
    return final;
  };

  const s = () => (final === 1 ? "" : "s");

  if (sd <= 5) return "just now.";
  else if (sd < 60) return `${f(sd / 1)} second${s()} ago`;
  else if (sd < 3600) return `${f(sd / 60)} minute${s()} ago`;
  else if (sd < 86400) return `${f(sd / 3600)} hour${s()} ago`;
  else if (sd < 604800) return `on ${createdDate.format("dddd")}`;
  else
    return `on ${createdDate.format("MMM")}. ${createdDate.format(
      "Do"
    )}, ${createdDate.year()}`;
}
