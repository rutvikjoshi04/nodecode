import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";

const initialFormValues = {
  title: "",
  year: 0,
  wins: 0,
  nominations: 0,
  cast: "",
  directors: "",
  plot: "",
  fullplot: "",
};

const AddMovie = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [submission, setSubmission] = useState(undefined);

  function handleOnSubmit(e) {
    e.preventDefault();

    let { title, year, wins, nominations, cast, directors, plot, fullplot } =
      formValues;

    const awards = { wins, nominations };
    cast = cast.split(",").map((el) => el.trim());
    directors = directors.split(",").map((el) => el.trim());

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpqQGdtYWlsLmNvbSIsImlhdCI6MTY3MDUxNzE1NiwiZXhwIjoxNjcxMTIxOTU2fQ.Oz2Iteg_6ijljuPk3GFWu8yjSdG_BeTxcobJPYFhQU4",
      },
      body: JSON.stringify({
        title,
        year,
        awards,
        cast,
        directors,
        plot,
        fullplot,
      }),
    };

    fetch("http://localhost:5001/api/Movies/", requestOptions)
      .then((response) => {
        if (response.status == 403)
          throw new Error("You need to be authenticated");
        if (!response.ok) throw new Error("Error adding new movie");
        console.log("status: ", response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSubmission({ status: "success", message: "Movie ID: " + data._id });
      })
      .catch((error) => {
        console.log("error: ", error);
        setSubmission({ status: "failure", message: error.message });
      });
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <>
      <Card style={{ maxWidth: 700, margin: "50px auto", padding: "20px 5px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add a Movie
          </Typography>
          <form onSubmit={handleOnSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="Title"
                  name="title"
                  placeholder="Enter title"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleOnChange}
                />
              </Grid>

              <Grid xs={12} sm={6} item>
                <TextField
                  label="Year"
                  type="number"
                  name="year"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  placeholder="Enter the year"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid xs={12} item>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  Awards:
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="Wins"
                  name="wins"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  placeholder="Enter number of prizes won"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="Nominations"
                  name="nominations"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  placeholder="Enter the number of nominations"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleOnChange}
                />
              </Grid>

              <Grid xs={12} sm={6} item style={{ marginTop: ".5rem" }}>
                <TextField
                  label="Cast"
                  name="cast"
                  placeholder="Enter the cast members comma separated"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid xs={12} sm={6} item style={{ marginTop: ".5rem" }}>
                <TextField
                  label="Directors"
                  name="directors"
                  placeholder="Enter the directors comma separated"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleOnChange}
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  label="Plot"
                  name="plot"
                  placeholder="Enter the plot"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  label="Full plot"
                  name="fullplot"
                  multiline
                  rows={4}
                  placeholder="Enter full plot"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
          <br />
          {submission?.status == "success" && (
            <Typography style={{ color: "green" }} variant="subtitle1">
              {submission.message}
            </Typography>
          )}
          {submission?.status == "failure" && (
            <Typography style={{ color: "red" }} variant="subtitle1">
              {submission.message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AddMovie;
