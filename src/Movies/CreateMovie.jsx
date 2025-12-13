import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, EditMovieColletion } from "../Thunk/Thunk";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { movieSchema } from "../Yup/YupValidation";



function CreateMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === "admin";

  const editMovie = useSelector((state) => state.user.editMovie);

  useEffect(() => {
    if (!isAdmin) {
      Swal.fire("Access Denied!", "Only Admin can access this page.", "error");
      navigate("/");
    }
  }, [isAdmin]);

  const formik = useFormik({
    initialValues: {
      _id: "",
      title: "",
      overview: "",
      release_date: "",
      vote_average: "",
      popularity: "",
    },
    enableReinitialize: true,
    validationSchema: movieSchema,
    onSubmit: async (values, { resetForm }) => {
      let res;

      if (editMovie) {
        res = await dispatch(EditMovieColletion(values));
        if (EditMovieColletion.fulfilled.match(res)) {
          Swal.fire("Updated!", "Movie updated successfully!", "success");
        }
        navigate("/listingAllmovies");
      } else {
        res = await dispatch(createMovie(values));
        if (createMovie.fulfilled.match(res)) {
          Swal.fire("Success!", "Movie created successfully!", "success");
        }
      }

      resetForm();
    },
  });

  useEffect(() => {
    if (editMovie) {
      formik.setValues({
        _id: editMovie._id || "",
        title: editMovie.title || "",
        overview: editMovie.overview || "",
        release_date: editMovie.release_date || "",
        vote_average: editMovie.vote_average || "",
        popularity: editMovie.popularity || "",
      });
    }
  }, [editMovie]);

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        mt: 5,
        background: "white",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
        {editMovie ? "Edit Movie" : "Create Movie"}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Movie Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          margin="normal"
          label="Overview"
          name="overview"
          value={formik.values.overview}
          onChange={formik.handleChange}
          error={formik.touched.overview && Boolean(formik.errors.overview)}
          helperText={formik.touched.overview && formik.errors.overview}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Release Date"
          name="release_date"
          InputLabelProps={{ shrink: true }}
          value={formik.values.release_date}
          onChange={formik.handleChange}
          error={
            formik.touched.release_date &&
            Boolean(formik.errors.release_date)
          }
          helperText={
            formik.touched.release_date && formik.errors.release_date
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Rating (0–10)"
          name="vote_average"
          type="number"
          value={formik.values.vote_average}
          onChange={formik.handleChange}
          error={
            formik.touched.vote_average &&
            Boolean(formik.errors.vote_average)
          }
          helperText={
            formik.touched.vote_average && formik.errors.vote_average
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Popularity"
          name="popularity"
          type="number"
          value={formik.values.popularity}
          onChange={formik.handleChange}
          error={
            formik.touched.popularity &&
            Boolean(formik.errors.popularity)
          }
          helperText={
            formik.touched.popularity && formik.errors.popularity
          }
        />

        {/* ONLY ADMIN CAN SUBMIT */}
        {isAdmin && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, py: 1 }}
          >
            {editMovie ? "Update Movie" : "Create Movie"}
          </Button>
        )}
      </form>
    </Box>
  );
}

export default CreateMovie;
