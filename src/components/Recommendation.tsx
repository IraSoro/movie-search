import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Grid, Button, Box } from "@mui/material";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  MovieControllerFindManyByQuerySimilarMoviesDoc,
  kinopoiskApiV14,
} from "../data/kinopoisk_api";

export const Recommendations = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const itemsPerPage = 3;

  const [activeIndex, setActiveIndex] = useState(0);
  const [movies, setMovies] = useState<
    MovieControllerFindManyByQuerySimilarMoviesDoc[]
  >([]);

  useEffect(() => {
    kinopoiskApiV14
      .movieControllerFindSimilarMovies({
        page: 1,
        limit: 10,
        id: Number(id),
      })
      .then((resp) => {
        setMovies(resp.docs[0].similarMovies);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    movies.length > 0 && (
      <>
        <Typography
          variant="h6"
          gutterBottom
        >
          Может понравится
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            width: 700,
            "@media (max-width: 600px)": {
              width: "auto",
            },
          }}
        >
          <Grid
            container
            justifyContent="space-between"
          >
            <Button
              color="inherit"
              onClick={() => {
                setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
              }}
              disabled={activeIndex === 0}
            >
              <NavigateBeforeIcon />
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                setActiveIndex((prevIndex) =>
                  Math.min(
                    prevIndex + 1,
                    Math.ceil(movies.length / itemsPerPage) - 1,
                  ),
                );
              }}
              disabled={
                activeIndex === Math.ceil(movies.length / itemsPerPage) - 1
              }
            >
              <NavigateNextIcon />
            </Button>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            {movies
              .slice(
                activeIndex * itemsPerPage,
                (activeIndex + 1) * itemsPerPage,
              )
              .map((movie, index) => (
                <Grid
                  item
                  xs={4}
                  key={index}
                >
                  <img
                    src={movie.poster.url}
                    alt={`${movie.name} Image`}
                    style={{ width: "100%" }}
                    onClick={() => {
                      globalThis.scrollTo({
                        top: 0,
                      });
                      navigate(`/movies/${movie.id}`, {
                        replace: true,
                      });
                    }}
                  />
                  <Typography sx={{ fontSize: "small" }}>
                    {movie.name}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Box>
      </>
    )
  );
};
