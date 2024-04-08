import React from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

interface Movie {
  title: string;
  description: string;
  actors: string[];
  seasons: string[];
  poster: string;
  rating: string;
}

interface PropsDetails {
  movie: Movie;
}

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const MovieDetails: React.FC<PropsDetails> = ({ movie }) => {
  return (
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
          <CardMedia
            component="img"
            height="auto"
            image={movie.poster}
            alt={movie.title}
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
            variant="h5"
            component="h2"
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
          >
            {movie.description}
          </Typography>
          <Typography
            variant="h6"
            component="h3"
          >
            Movie rating{" "}
            <span style={{ color: "#474d4e" }}>{movie.rating}</span>
          </Typography>
          <Typography
            variant="h6"
            component="h3"
          >
            Actors:
          </Typography>
          {movie.actors.length === 0 ? (
            <Typography>No information about actors</Typography>
          ) : (
            <ul style={listStyle}>
              {movie.actors.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          )}
          <Typography
            variant="h6"
            component="h3"
          >
            Seasons:
          </Typography>
          {movie.seasons.length === 0 ? (
            <Typography>No information about seasons</Typography>
          ) : (
            <ul style={listStyle}>
              {movie.seasons.map((season) => (
                <li key={season}>{season}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default function Movie() {
  const { _id } = useParams<string>();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ flexGrow: 1, maxWidth: 700 }}>
        <MovieDetails
          movie={{
            title: "The Shawshank Redemption",
            description:
              "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
            seasons: ["Season 1", "Season 2", "Season 3"],
            poster: "/assets/default.jpg",
            rating: "8.0",
          }}
        />
      </Box>
    </div>
  );
}
