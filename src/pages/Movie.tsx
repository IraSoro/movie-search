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
  Skeleton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GradeIcon from "@mui/icons-material/Grade";

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
      {movie.name ? (
        <Typography
          variant="h4"
          component="h2"
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        >
          {movie.name || movie.alternativeName}
        </Typography>
      ) : (
        <Stack
          sx={{ marginTop: "20px", marginBottom: "10px" }}
          spacing={2}
        >
          <Skeleton variant="rectangular"></Skeleton>
          <Skeleton
            variant="rectangular"
            width="50%"
          ></Skeleton>
        </Stack>
      )}

      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          {movie.poster.previewUrl ? (
            <Card>
              <Box
                component="img"
                sx={{
                  height: "auto",
                  maxWidth: "100%",
                  display: "block",
                  overflow: "hidden",
                }}
                src={movie.poster.previewUrl || "./assets/default.jpg"}
                alt={`${movie.name} poster`}
              />
            </Card>
          ) : (
            <Skeleton
              variant="rectangular"
              width={350}
              height={450}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          {movie.rating.kp ? (
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <GradeIcon />
                <span style={{ color: "#474d4e" }}>
                  &nbsp;{movie.rating.kp}
                </span>
              </Typography>
              <Typography
                variant="h6"
                component="h3"
              >
                Актеры:
              </Typography>
              <ActorsList />
              {movie.type.includes("series") && (
                <>
                  <Typography
                    variant="h6"
                    component="h3"
                  >
                    Сезоны:
                  </Typography>
                  <SeasonsList />
                </>
              )}
            </CardContent>
          ) : (
            <Stack spacing={2}>
              <Skeleton
                variant="rectangular"
                width={100}
              />
              <Skeleton
                variant="rectangular"
                width={300}
                height={200}
              />
            </Stack>
          )}
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
    alternativeName: "",
    type: "",
    description: "",
    poster: { url: "", previewUrl: "" },
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
            Описание
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
            Постеры
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
