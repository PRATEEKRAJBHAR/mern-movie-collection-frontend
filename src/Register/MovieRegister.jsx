import React, { useState } from "react";
import { useFormik } from "formik";
import {RegisterValidation} from "../Yup/YupValidation";
import { fetchUsers } from "../Thunk/Thunk";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MovieRegister() {
  const dispatch = useDispatch();
const navigate=useNavigate()
  const {error, user } = useSelector((state) => state.user);//yaha pra jo state.user hai (user) store me se aaya hai.
//   console.log(user,"this is user");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      email: "",
      password: "",
      confirm_password: "",
      role:""
    },
    validationSchema: RegisterValidation,
     onSubmit: async (values) => {
    try {
      setLoading(true);
      setMsg("");

      const res = await dispatch(fetchUsers(values));

      if (fetchUsers.fulfilled.match(res)) {
        await Swal.fire({
          title: "Success!",
          text: res.payload?.message || "User Registered Successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/movie-login')
      } else {
        await Swal.fire({
          title: "Error!",
          text: res.payload?.message || "Registration failed!",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  },

  });

  const fields = [
    { name: "name", type: "text", placeholder: "Enter your name" },
    { name: "age", type: "number", placeholder: "Enter your age" },
    { name: "email", type: "email", placeholder: "Enter your email" },
    { name: "password", type: "password", placeholder: "Enter your password" },
    { name: "confirm_password", type: "password", placeholder: "Confirm your password" },
  ];

  return (
    <div className="p-5 max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Register</h1>

      {msg && <p className="text-center text-green-600 font-semibold">{msg}</p>}

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {fields.map((val) => (
          <div key={val.name}>
            <input
              type={val.type}
              name={val.name}
              placeholder={val.placeholder}
              className="border px-3 py-2 w-full"
              value={formik.values[val.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[val.name] && formik.errors[val.name] && (
              <p className="text-red-500 text-sm">{formik.errors[val.name]}</p>
            )}
          </div>
        ))}

        <div>
          <select
            name="gender"
            className="border px-3 py-2 w-full"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
          )}
        </div>
         <div>
          <select
            name="role"
            className="border px-3 py-2 w-full"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select role</option>
            {/* <option value="admin">admin</option> */}
            <option value="user">user</option>
          </select>

          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default MovieRegister;
