import { createSlice } from "@reduxjs/toolkit";
import {
  createMovie,
  EditMovieCollection,
  DeleteMovieCollection,
  fetchMovies,
  fetchUsers,
  loginUsers,
} from "./Thunk";

const initialState = {
  loading: false,
  user: null,
  token: null,
  movies: [],
  editMovie: null,
  totalPage: 1,
  currentPage: 1,
  search: "",
  sortedField: "",
  sortedOrder: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    GET_USER_FROM_STORAGE: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    LOGOUT_USER: (state) => {
      state.user = null;
      state.token = null;
    },
    EDIT_MOVIE: (state, action) => {
      state.editMovie = action.payload;
    },
    CLEAR_EDIT_MOVIE: (state) => {
      state.editMovie = null;
    },
    DELETE_MOVIE_OPTIMISTIC: (state, action) => {
      state.movies = state.movies.map((movie) =>
        movie._id === action.payload ? { ...movie, isDeleted: true } : movie
      );
    },
  },
  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // LOGIN
    builder
      .addCase(loginUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // FETCH MOVIES
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalPage = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.search = action.meta.arg.search;
        state.sortedField = action.meta.arg.sortedField;
        state.sortedOrder = action.meta.arg.sortedOrder;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // CREATE MOVIE
    builder
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.unshift(action.payload.movie); // add new movie to top
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPDATE MOVIE
    builder
      .addCase(EditMovieCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditMovieCollection.fulfilled, (state, action) => {
        state.loading = false;
        const updatedMovie = action.payload.movie;
        state.movies = state.movies.map((m) =>
          m._id === updatedMovie._id ? updatedMovie : m
        );
      })
      .addCase(EditMovieCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // DELETE MOVIE
    builder
      .addCase(DeleteMovieCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteMovieCollection.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg;
        state.movies = state.movies.filter((m) => m._id !== deletedId);
      })
      .addCase(DeleteMovieCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  GET_USER_FROM_STORAGE,
  LOGOUT_USER,
  EDIT_MOVIE,
  CLEAR_EDIT_MOVIE,
  DELETE_MOVIE_OPTIMISTIC,
} = userSlice.actions;

export default userSlice.reducer;
