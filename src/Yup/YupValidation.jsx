import * as Yup from "yup";

export  const RegisterValidation = Yup.object({
  name: Yup.string().min(3, "At least 3 characters").required("Name is required"),
  age: Yup.number().positive().integer().required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(1, "Min 1 characters").required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password mismatch")
    .required("Confirm password is required"),
});


export const loginSchema=Yup.object({
  email:Yup.string().required("email is require").email("Invalid Email Formate"),
  password:Yup.string().required("Password is Required")
})



// create books
export const createBookSchema=Yup.object({
  title:Yup.string().required("title is required"),
  author:Yup.string().required("author is required"),
publishedYear:Yup.string().required("publishedYear is required"),
  price:Yup.string().required("price is required"),
   genre:Yup.string().required("genre is required"),

})



export const movieSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  overview: Yup.string()
    .required("Overview is required"),
  release_date: Yup.date().required("Release date is required"),
  vote_average: Yup.number()
    .min(0, "Minimum value is 0")
    .max(10, "Maximum value is 10")
    .required("Rating is required"),
  popularity: Yup.number()
    .min(0, "Popularity cannot be negative")
    .required("Popularity is required"),
});

export default { RegisterValidation, loginSchema ,createBookSchema ,movieSchema};

