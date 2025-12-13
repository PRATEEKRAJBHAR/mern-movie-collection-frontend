import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { GET_USER_FROM_STORAGE, LOGOUT_USER } from "./Thunk/ReducerOrSlice";

function Navbar() {
  const [openBox, setOpenBox] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenBox(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      dispatch(
        GET_USER_FROM_STORAGE({
          user: JSON.parse(storedUser),
          token: storedToken
        })
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(LOGOUT_USER());
    // dispatch(AUTH_BOOKS());
    navigate("/movie-login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">


      <div className="relative" ref={menuRef}>
        <button onClick={() => setOpenBox(prev => !prev)} className="flex items-center gap-2">
          <AccountCircleIcon />
          <span>{user ? user.name : "Account"}</span>
        </button>

        {openBox && (
          <div className="absolute right-0 mt-2  bg-white text-black rounded shadow-lg z-50">
            {!user ? (
              <>
                <NavLink to="/movie-register" className="block px-4 py-2 hover:bg-gray-100">Register</NavLink>
                <NavLink to="/movie-login" className="block px-4 py-2 hover:bg-gray-100">Login</NavLink>
                {/* <NavLink onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">Logout</NavLink> */}

              </>
            ) : (
              <>
                <div className="px-4 py-2  border-b">{user.email}</div>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
