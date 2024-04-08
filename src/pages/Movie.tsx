import React, { useState } from "react";
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

interface DetailsProps {
  movie: Movie;
}

interface ListProps {
  list: string[];
}

const ListPagination: React.FC<ListProps> = ({ list }) => {
  const maxCount = 3;
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  if (list.length === 0) return <Typography>No information</Typography>;
  else
    return (
      <>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
          }}
        >
          {showAll
            ? list.map((actor, index) => (
                <Typography key={index}>{actor}</Typography>
              ))
            : list
                .slice(0, maxCount)
                .map((item, index) => (
                  <Typography key={index}>{item}</Typography>
                ))}
        </ul>
        {!showAll && list.length > maxCount && (
          <Typography
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#474d4e",
              marginBottom: "15px",
            }}
            onClick={handleShowAll}
          >
            Show All
          </Typography>
        )}
      </>
    );
};

const MovieDetails: React.FC<DetailsProps> = ({ movie }) => {
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
          <ListPagination list={movie.actors} />
          <Typography
            variant="h6"
            component="h3"
          >
            Seasons:
          </Typography>
          <ListPagination list={movie.seasons} />
        </CardContent>
      </Grid>
    </Grid>
  );
};

const testMovieInfo = {
  title: "The Shawshank Redemption",
  description:
    "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  actors: [
    "Tim Robbins",
    "Morgan Freeman",
    "Bob Gunton",
    "Tim Robbins",
    "Morgan Freeman",
    "Bob Gunton",
  ],
  seasons: [
    "Season 1",
    "Season 2",
    "Season 3",
    "Season 4",
    "Season 5",
    "Season 6",
  ],
  poster: "/assets/default.jpg",
  rating: "8.0",
};

export default function Movie() {
  const { _id } = useParams<string>();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ flexGrow: 1, maxWidth: 700 }}>
        <MovieDetails movie={testMovieInfo} />
      </Box>
    </div>
  );
}
