import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:8080/" : "/";

export const request = axios.create({
  baseURL,
  headers: {
    ...(sessionStorage.getItem("jwtToken") && {
      Authorization: sessionStorage.getItem("jwtToken"),
    }),
  },
});
