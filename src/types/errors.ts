export const NO_LOGIN = {
  message: "User is not logged in.",
  status: "UNAUTHORIZED",
};

export const BAD_TOKEN = {
  message: "The access token expired or there was none to begin with.",
  status: "UNAUTHORIZED",
};

export const NOT_AUTHORIZED = {
  message: "This user does not have the proper auth to request this content.",
  status: "UNAUTHORIZED",
};

export const NO_CLASSES = {
  message: "User has no classes.",
  status: "EMPTY",
};

export const NO_THREADS = {
  message: "Class has no threads.",
  status: "EMPTY",
};

export const NO_CONNECTION = {
  message: "Chomp was unable to connect to this resource.",
  status: "NO CONNECTION",
};

export const NULL_RESPONSE = {
  message: "Nothing was returned as a response",
  status: "EMPTY",
};
