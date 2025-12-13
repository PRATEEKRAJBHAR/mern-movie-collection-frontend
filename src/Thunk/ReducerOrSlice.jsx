import { createSlice } from "@reduxjs/toolkit";
import {  createMovie, DeleteMovieCollection, EditMovieColletion, fetchMovies, fetchUsers, loginUsers } from "./Thunk";
const initialState = {
  loading: false,
  user: null,
  error: null,
  token: null,
  movies: [],
  editMovie: null,

  totalPage: 1,
  currentPage: 1,

  search: "",
  sortedField: "",
  sortedOrder: "",
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    GET_USER_FROM_STORAGE: (state, action) => {
      console.log("Action received in reducer:", action);
      // console.log("state received in reducer:", state);
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
    DELETE_MOVIE_OPTIMISTIC: (state, action) => {
    state.movies = state.movies.map(movie =>
      movie._id === action.payload ? { ...movie, isDeleted: true } : movie
    );
  },
  },
  extraReducers: (builder) => {
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
      })
      //   here login data
      .addCase(loginUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        // console.log(action,"data");
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   

// get movies

.addCase(fetchMovies.pending, (state) => {
        state.loading = true,
          state.error = null
                // console.log(pending,"pending");

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
        state.loading = false,
          state.error = action.payload
      })


      .addCase(createMovie.pending,(state)=>{
        state.loading=true;
        state.error=false
      })
      .addCase(createMovie.fulfilled,(state,action)=>{
        state.loading=false;
        state.user=action.payload;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(EditMovieColletion.pending, (state) => {
        state.loading = true;
        state.error = null
      })
     .addCase(EditMovieColletion.fulfilled, (state, action) => {
    state.loading = false;

    const updatedMovie = action.payload.movie;

    state.movies = state.movies.map(movie =>
        movie._id === updatedMovie._id ? updatedMovie : movie
    );
})


      .addCase(EditMovieColletion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // here delete data
.addCase(DeleteMovieCollection.pending, (state) => {
        state.loading = true;
        state.error = null
      })
    .addCase(DeleteMovieCollection.fulfilled, (state, action) => {
    state.loading = false;
    const deletedId = action.meta.arg;

    state.movies = state.movies.filter(movie => movie._id !== deletedId);
})

      .addCase(DeleteMovieCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});
export const { GET_USER_FROM_STORAGE, LOGOUT_USER , EDIT_MOVIE ,DELETE_MOVIE_OPTIMISTIC} = userSlice.actions;

export default userSlice.reducer;
