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

// Replace with your deployed Vercel backend URL
const API = axios.create({
  baseURL: "https://prateeks-projects-54eaba72.vercel.app/api/users",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
