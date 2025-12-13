import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Apis/Api";
import { thunk } from "redux-thunk";

export const fetchUsers = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const res = await API.post("/register", userData);
      console.log(res,"this is responsesssss");
      console.log(userData,"user data");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);



// this is login

export const loginUsers = createAsyncThunk(
  "user/loginUser",
  async (loginUserData, thunkAPI) => {
    try {
      const res = await API.post("/login", loginUserData);
      console.log(res,"this is response");
      console.log(loginUserData,"user data");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);





export const fetchMovies = createAsyncThunk(
  "user/fetchAllmovies",
  async ({
    search = "",
    token,
    sortedField = "",
    sortedOrder = "",
    page = 1,
    limit = 10
  }, thunkAPI) => {
    try {
      const res = await API.get(
        `/movies?search=${search}&sortedField=${sortedField}&sortedOrder=${sortedOrder}&page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);



export const createMovie=createAsyncThunk(
  "create/movies",
  async(createMovie,thunkAPI)=>{
    try{
      const res=await API.post('/create-movie',createMovie)
      return res.data

    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)

    }
  }
)




export const EditMovieColletion=createAsyncThunk(
  'edit/editMoviecolletion',
  async(editMovieData,thunkAPI)=>{
    try{
      const edit=await API.put(`/update/${editMovieData._id}`,editMovieData)
      console.log(edit);
      return edit.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)



// delete movie collection
export const DeleteMovieCollection = createAsyncThunk(
  'delete/Moviecollection',
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/delete/${id}`); // send only id in URL
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);