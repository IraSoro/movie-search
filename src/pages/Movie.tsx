import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  MobileStepper,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { testMovieInfo } from "../../assets/testMovieInfo";

interface Review {
  author: string;
  comment: string;
}

interface Movie {
  title: string;
  description: string;
  actors: string[];
  seasons: string[];
  poster: string[];
  rating: string;
  reviews: Review[];
}

interface ReviewsProps {
  reviews: Review[];
}

const ReviewsBox: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
      >
        Reviews:
      </Typography>
      <List>
        {reviews.map((review, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              marginBottom: 1,
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<strong>{review.author}</strong>}
              secondary={review.comment}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

interface SwiperPostersProps {
  images: string[];
}

const SwiperPosters: React.FC<SwiperPostersProps> = ({ images }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        component="img"
        sx={{
          height: "auto",
          maxWidth: "100%",
          display: "block",
          overflow: "hidden",
        }}
        src={images[activeStep]}
        alt={`image ${activeStep + 1}`}
      />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        elevation={0}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
        }
      />
    </Box>
  );
};

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

interface DetailsProps {
  movie: Movie;
}

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
          <SwiperPosters images={movie.poster} />
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

export default function Movie() {
  const { _id } = useParams<string>();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ flexGrow: 1, maxWidth: 700 }}>
        <Stack>
          <MovieDetails movie={testMovieInfo} />
          <Box sx={{ height: "40px" }} />
          <ReviewsBox reviews={testMovieInfo.reviews} />
        </Stack>
      </Box>
    </div>
  );
}
