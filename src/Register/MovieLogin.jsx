import { useFormik } from 'formik'
import React from 'react'
import { loginSchema } from '../Yup/YupValidation';
import { useDispatch, useSelector } from 'react-redux';
import { loginUsers } from '../Thunk/Thunk';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function MovieLogin() {
  const dispatch = useDispatch();
  // const selector=useSelector((state)=>state.user);
  // const selector = useSelector((state) => state.user.user.data.name);
  // console.log(userName);
  console.log(loginUsers, "login user");
  const navigate = useNavigate();
  // console.log(selector,"this is selector prossess");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {

        const res = await dispatch(loginUsers(values));

        console.log(res, "this is response");
        if (loginUsers.fulfilled.match(res)) {
          console.log(res, "response");
          localStorage.setItem("user", JSON.stringify(res.payload.data));
          localStorage.setItem("token", res.payload.token);
          await Swal.fire({
            title: "Success!",
            text: res.payload?.message || "User Login Successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate('/listingAllmovies')
          //  action.resetForm()
        } else {
          await Swal.fire({
            title: "Error!",
            text: res.payload?.message || "Login failed!",
            icon: "error",
          });
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
        });
      }
    },
  })
  const fields = [
    { name: "email", type: "email", placeholder: "enter your email" },
    { name: "password", type: "text", placeholder: "enter your password" }
  ]
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  p-5">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Login</h1>


        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          {fields.map((val) => (
            <div key={val.name}>
              <label className="text-sm font-medium text-slate-600 mb-1 block capitalize">{val.name}</label>
              <input
                type={val.type}
                name={val.name}
                placeholder={val.placeholder}
                value={formik.values[val.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {formik.touched[val.name] && formik.errors[val.name] && (
                <p className="text-red-500 text-xs mt-1">{formik.errors[val.name]}</p>
              )}
            </div>
          ))}


          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all active:scale-95"
          >
            Login
          </button>
        </form>



      </div>
    </div>
  )
}

export default MovieLogin