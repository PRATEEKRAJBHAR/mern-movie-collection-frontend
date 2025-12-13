import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, DeleteMovieCollection } from "../Thunk/Thunk";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { EDIT_MOVIE } from "../Thunk/ReducerOrSlice";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function AllMovieListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, movies, currentPage, totalPage } = useSelector(
    (state) => state.user
  );

  const [openBoxId, setOpenBoxId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortedField, setSortedField] = useState("");
  const [sortedOrder, setSortedOrder] = useState("asc");
const actionMenuRef = useRef(null);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      actionMenuRef.current &&
      !actionMenuRef.current.contains(event.target)
    ) {
      setOpenBoxId(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const [page, setPage] = useState(1);
  const limit = 10;

  const sortFieldMap = {
    Name: "title",
    Description: "overview",
    "Release Date": "release_date",
    Rating: "vote_average"
  };

  useEffect(() => {
    if (!token) return;
    dispatch(
      fetchMovies({
        search: searchValue,
        token,
        sortedField,
        sortedOrder,
        page,
        limit
      })
    );
  }, [page, token, sortedField, sortedOrder]);

  useEffect(() => {
    if (!token) return;
    dispatch(
      fetchMovies({
        search: "",
        token,
        sortedField: "",
        sortedOrder: "",
        page: 1,
        limit
      })
    );
  }, [token]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setPage(1);

    if (!token) return;
    dispatch(
      fetchMovies({
        search: value,
        sortedField,
        sortedOrder,
        token,
        page: 1,
        limit
      })
    );
  };

  // Sort
  const handleSort = (columnName) => {
    const field = sortFieldMap[columnName];
    if (!field) return;
    const newOrder = sortedOrder === "asc" ? "desc" : "asc";
    setSortedField(field);
    setSortedOrder(newOrder);
    setOpenBoxId(null);

    if (!token) return;
    dispatch(fetchMovies({ search: searchValue, sortedField: field, sortedOrder: newOrder, token, page: 1, limit }));
    setPage(1);
  };

  // Edit
  const handleEdit = (movie) => {
    dispatch(EDIT_MOVIE(movie));
    navigate("/create/movies");
  };

  // Delete Movie
const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(DeleteMovieCollection(id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Movie has been deleted.",
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
};


  // Highlight
  const highlightText = (text) => {
    if (!searchValue) return text || "";
    const regex = new RegExp(`(${searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return (text || "").replace(regex, (match) => `<mark class="bg-yellow-300">${match}</mark>`);
  };

  if (!token) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">All Movie Collection</h1>
        <div className="p-6 bg-white rounded shadow text-center">
          <p className="mb-4">You must be logged in to view movies.</p>
          <div className="flex justify-center gap-3">
            <NavLink to="/movie-register" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Register</NavLink>
            <NavLink to="/movie-login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</NavLink>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  const Heading = ["S.N", "Name", "Description", "Release Date", "Rating", ...(isAdmin ? ["Action"] : [])];

 return (
  <div className="p-6">
    <h1 className="text-2xl font-semibold mb-6 text-gray-900">All Movie Collection</h1>

    <div className="flex justify-between items-center mb-5">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search movies by Name and Description..."
        className="w-100 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isAdmin && (
        <button
          onClick={() => navigate("/create/movies")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Add Movie
        </button>
      )}
    </div>

<div className="overflow-x-auto rounded-xl shadow-lg bg-white">
      {/* <table className="w-full border-collapse text-sm"> */}
        <table className="w-full border border-gray-300 border-collapse text-sm">

        <thead className="bg-gray-900 text-white">
          <tr>
            {Heading.map((head, i) => (
              <th key={i} className="px-4 py-3 border border-gray-300 text-left">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort(head)}>
                  {head}
                  {sortFieldMap[head] && (
                    <span className="flex flex-col ml-1">
                      <ArrowDropUpIcon
                        style={{
                          fontSize: "18px",
                          opacity:
                            sortedField === sortFieldMap[head] && sortedOrder === "asc" ? 1 : 0.2
                        }}
                      />
                      <ArrowDropDownIcon
                        style={{
                          fontSize: "18px",
                          opacity:
                            sortedField === sortFieldMap[head] && sortedOrder === "desc" ? 1 : 0.2
                        }}
                      />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {movies?.length > 0 ? (
            movies.map((movie, index) => (
              <tr key={movie._id} className="  hover:bg-gray-50 transition">
                <td className="px-4 py-3 border border-gray-300">{(page - 1) * limit + index + 1}</td>

                <td
                  className="px-4 py-3 border border-gray-300"
                  dangerouslySetInnerHTML={{ __html: highlightText(movie.title) }}
                ></td>

                <td
                  className="px-4 py-3 border border-gray-300"
                  dangerouslySetInnerHTML={{ __html: highlightText(movie.overview) }}
                ></td>

                <td className="px-4 py-3 border border-gray-300">
                  {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : ""}
                </td>

                <td className="px-4 py-3 border border-gray-300">{movie.vote_average ?? "-"}</td>

                {isAdmin && (
                  <td className="px-6 py-3 relative">
                    <MoreVertIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenBoxId((prev) => (prev === movie._id ? null : movie._id));
                      }}
                      className="cursor-pointer"
                    />

                    {openBoxId === movie._id && (
                      <div
                        ref={actionMenuRef}
                        className="absolute top-10 right-0 bg-white border shadow-lg rounded-lg w-40 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setOpenBoxId(null);
                            handleEdit(movie);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setOpenBoxId(null);
                            handleDelete(movie._id);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={Heading.length} className="text-center py-4 text-gray-500">
                No movies found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center mt-6 gap-3">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-4 py-2 rounded bg-gray-800 text-white ${
          page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
        }`}
      >
        Previous
      </button>

      <span className="text-lg font-semibold">
        Page {page} of {totalPage}
      </span>

      <button
        disabled={page === totalPage}
        onClick={() => setPage(page + 1)}
        className={`px-4 py-2 rounded bg-gray-800 text-white ${
          page === totalPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
        }`}
      >
        Next
      </button>
    </div>
  </div>
);

}

export default AllMovieListing;
