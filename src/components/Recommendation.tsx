import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Grid, Button } from "@mui/material";

import { Link } from "react-router-dom";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  MovieControllerFindManyByQuerySimilarMoviesDoc,
  kinopoiskApiV14,
} from "../data/kinopoisk_api";

export const Recommendations = () => {
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
    <>
      <Typography
        variant="h6"
        gutterBottom
      >
        Recommendations
      </Typography>
      <div>
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
          <Grid
            item
            xs={1}
          >
            <Button
              onClick={() => {
                setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
              }}
              disabled={activeIndex === 0}
            >
              <NavigateBeforeIcon />
            </Button>
          </Grid>
          <Grid
            item
            xs={10}
          >
            <Grid
              container
              spacing={2}
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
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={movie.poster.url}
                        alt={`${movie.name} Image`}
                        style={{ width: "100%" }}
                      />
                    </Link>
                    <Typography sx={{ fontSize: "small" }}>
                      {movie.name}
                    </Typography>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
          >
            <Button
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
        </Grid>
      </div>
    </>
  );
};
