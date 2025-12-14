import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Apis/Api";

// REGISTER
export const fetchUsers = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const res = await API.post("/register", userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// LOGIN
export const loginUsers = createAsyncThunk(
  "user/loginUser",
  async (loginUserData, thunkAPI) => {
    try {
      const res = await API.post("/login", loginUserData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// FETCH MOVIES
export const fetchMovies = createAsyncThunk(
  "movies/fetch",
  async (
    { search = "", token, sortedField = "", sortedOrder = "", page = 1, limit = 10 },
    thunkAPI
  ) => {
    try {
      const res = await API.get(
        `/movies?search=${search}&sortedField=${sortedField}&sortedOrder=${sortedOrder}&page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// CREATE MOVIE
export const createMovie = createAsyncThunk(
  "movies/create",
  async (movieData, thunkAPI) => {
    try {
      const res = await API.post("/create-movie", movieData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// UPDATE MOVIE
export const EditMovieCollection = createAsyncThunk(
  "movies/update",
  async (editMovieData, thunkAPI) => {
    try {
      const res = await API.put(`/update/${editMovieData._id}`, editMovieData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// DELETE MOVIE
export const DeleteMovieCollection = createAsyncThunk(
  "movies/delete",
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/delete/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);
