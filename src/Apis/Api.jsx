// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:3000/api/users",
//   withCredentials: true,

//   headers: {
//     "Content-Type": "application/json",
//   },
// });




// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "api/users",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
