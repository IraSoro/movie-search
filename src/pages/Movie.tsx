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
  Pagination,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { testMovieInfo } from "../../assets/testMovieInfo";

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
                    <img
                      src={item.poster[0]}
                      alt={`Image ${index}`}
                      style={{ width: "100%" }}
                    />
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

interface ReviewsProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewsProps> = ({ reviews }) => {
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  const pageCount = Math.ceil(reviews.length / reviewsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * reviewsPerPage;
  const endIndex = page * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
      >
        Reviews
      </Typography>
      <List>
        {currentReviews.map((review, index) => (
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            size="large"
          />
        </div>
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
  const maxCount = 5;
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
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{ marginTop: "20px", marginBottom: "10px" }}
      >
        {movie.title}
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
    </>
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
            {testMovieInfo.description}
          </Typography>
          <Box sx={{ height: "40px" }} />
          <ReviewList reviews={testMovieInfo.reviews} />
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
