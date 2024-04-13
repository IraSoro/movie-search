import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Stack,
  Button,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { SwiperPosters } from "../components/Swipers";
import { ActorsList, SeasonsList, ReviewsList } from "../components/ListsInfo";
import { Recommendations } from "../components/Recommendation";

import {
  MovieControllerFindOneResponse,
  kinopoiskApiV14,
} from "../data/kinopoisk_api";

interface DetailsProps {
  movie: MovieControllerFindOneResponse;
}

const MovieDetails: React.FC<DetailsProps> = ({ movie }) => {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{ marginTop: "20px", marginBottom: "10px" }}
      >
        {movie.name}
      </Typography>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card>
            <Box
              component="img"
              sx={{
                height: "auto",
                maxWidth: "100%",
                display: "block",
                overflow: "hidden",
              }}
              src={movie.poster.url}
              alt={`${movie.name} poster`}
            />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="h3"
            >
              Movie rating{" "}
              <span style={{ color: "#474d4e" }}>{movie.rating.kp}</span>
            </Typography>
            <Typography
              variant="h6"
              component="h3"
            >
              Actors:
            </Typography>
            <ActorsList />
            <Typography
              variant="h6"
              component="h3"
            >
              Seasons:
            </Typography>
            <SeasonsList />
          </CardContent>
        </Grid>
      </Grid>
    </>
  );
};

export default function Movie() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [movieInfo, setMovieInfo] = useState<MovieControllerFindOneResponse>({
    name: "",
    type: "",
    description: "",
    poster: { url: "" },
    similarMovies: [],
    rating: {
      kp: 0,
    },
  });

  useEffect(() => {
    kinopoiskApiV14
      .movieControllerFindOne({
        id: Number(id),
      })
      .then((resp) => {
        setMovieInfo(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ flexGrow: 1, maxWidth: 700 }}>
        <Stack>
          <Button
            sx={{
              borderRadius: "20px",
              boxShadow: "none",
              color: "#000000",
              marginRight: "auto",
              maxWidth: "250px",
            }}
            startIcon={<ArrowBackIosIcon />}
            color="inherit"
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Назад к поиску
          </Button>
          <MovieDetails movie={movieInfo} />
          <Box sx={{ height: "40px" }} />
          <Typography
            variant="h6"
            gutterBottom
          >
            About movies
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
          >
            {movieInfo.description}
          </Typography>
          <Box sx={{ height: "40px" }} />
          <Typography
            variant="h6"
            gutterBottom
          >
            Posters
          </Typography>
          <SwiperPosters />
          <Box sx={{ height: "40px" }} />
          <ReviewsList />
          <Box sx={{ height: "40px" }} />
          <Recommendations />
        </Stack>
      </Box>
    </div>
  );
}
