import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Stack,
} from "@mui/material";

import { Link } from "react-router-dom";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { SwiperPosters } from "../components/Swipers";
import { ActorsList, SeasonsList, ReviewsList } from "../components/ListsInfo";

import { testMovieInfo } from "../../assets/testMovieInfo";
import {
  MovieControllerFindOneResponse,
  kinopoiskApiV14,
} from "../data/kinopoisk_api";

interface Review {
  author: string;
  comment: string;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  actors: string[];
  seasons: string[];
  poster: string[];
  rating: string;
  reviews: Review[];
}

interface RecommendationsProps {
  movies: Movie[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.ceil(movies.length / itemsPerPage) - 1),
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

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
              onClick={handlePrev}
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
                .map((item, index) => (
                  <Grid
                    item
                    xs={4}
                    key={index}
                  >
                    <Link to={`/movies/${item.id}`}>
                      <img
                        src={item.poster[0]}
                        alt={`Image ${index}`}
                        style={{ width: "100%" }}
                      />
                    </Link>
                    <Typography sx={{ fontSize: "small" }}>
                      {item.title}
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
              onClick={handleNext}
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
  const { id } = useParams<string>();
  console.log("id = ", id);
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
          <Link to="/">Back to Movie Search</Link>
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
          <Recommendations
            movies={[
              testMovieInfo,
              testMovieInfo,
              testMovieInfo,
              testMovieInfo,
            ]}
          />
        </Stack>
      </Box>
    </div>
  );
}
