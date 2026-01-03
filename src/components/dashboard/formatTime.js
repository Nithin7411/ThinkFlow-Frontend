import moment from "moment";

export const fromFirestoreTime = (ts) => {
  if (!ts?._seconds) return "";
  return moment(
    new Date(ts._seconds * 1000 + ts._nanoseconds / 1e6)
  ).fromNow();
};

