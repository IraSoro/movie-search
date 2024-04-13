import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Pagination,
  Button,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import {
  kinopoiskApiV14,
  PersonControllerFindManyDocs,
  ReviewControllerFindManyDocs,
  SeasonControllerFindManyDocs,
} from "../data/kinopoisk_api";

export const ReviewsList = () => {
  const { id } = useParams<string>();
  const limit = 5;
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(limit);
  const [reviews, setReviews] = useState<ReviewControllerFindManyDocs[]>([]);

  const pageCount = Math.ceil(total / limit);

  useEffect(() => {
    kinopoiskApiV14
      .reviewControllerFindMany({
        page: page,
        limit: limit,
        moviesId: Number(id),
      })
      .then((resp) => {
        setReviews(resp.docs);
        setTotal(resp.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, page]);

  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
      >
        Рецензии зрителей
      </Typography>
      {reviews.length === 0 ? (
        <Typography>Нет информации</Typography>
      ) : (
        <List>
          {reviews.map((review, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                marginBottom: 1,
                alignItems: "flex-start",
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<strong>{review.author}</strong>}
                secondary={review.review}
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
              onChange={(e, newPage: number) => {
                setPage(newPage);
              }}
              size="large"
            />
          </div>
        </List>
      )}
    </div>
  );
};

export const SeasonsList = () => {
  const { id } = useParams<string>();
  const [total, setTotal] = useState(10);
  const [limit, setLimit] = useState(10);
  const [seasons, setSeasons] = useState<SeasonControllerFindManyDocs[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [fold, setFold] = useState(false);

  useEffect(() => {
    kinopoiskApiV14
      .seasonControllerFindMany({
        page: 1,
        limit: limit,
        moviesId: Number(id),
      })
      .then((resp) => {
        setSeasons(resp.docs);
        setTotal(resp.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, limit]);

  if (seasons.length === 0) return <Typography>Нет информации</Typography>;
  return (
    <>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
        }}
      >
        {showAll ? (
          <Typography>
            {seasons.map((_season, index) => `Season ${index + 1}`).join(", ")}
          </Typography>
        ) : (
          <Typography>
            {seasons
              .slice(0, total)
              .map((_season, index) => `Season ${index + 1}`)
              .join(", ")}
          </Typography>
        )}
      </ul>
      {showAll && seasons.length < total && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              borderRadius: "20px",
              boxShadow: "none",
              color: "#000000",
              marginTop: "5px",
            }}
            color="inherit"
            variant="contained"
            size="small"
            endIcon={<ArrowDropDownIcon />}
            onClick={() => {
              setShowAll(false);
              setFold(true);
              setLimit(total);
            }}
          >
            Показать все
          </Button>
        </div>
      )}
      {fold && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              borderRadius: "20px",
              boxShadow: "none",
              color: "#000000",
              marginTop: "5px",
            }}
            color="inherit"
            variant="contained"
            size="small"
            endIcon={<ArrowDropUpIcon />}
            onClick={() => {
              setShowAll(true);
              setFold(false);
              setLimit(10);
            }}
          >
            Свернуть
          </Button>
        </div>
      )}
    </>
  );
};

export const ActorsList = () => {
  const { id } = useParams<string>();
  const [total, setTotal] = useState(10);
  const [limit, setLimit] = useState(10);
  const [actors, setActors] = useState<PersonControllerFindManyDocs[]>([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    kinopoiskApiV14
      .personControllerFindMany({
        page: 1,
        limit: limit,
        moviesId: Number(id),
      })
      .then((resp) => {
        setActors(resp.docs);
        setTotal(resp.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, limit]);

  if (actors.length === 0) return <Typography>Нет информации</Typography>;
  return (
    <>
      {showAll ? (
        <Typography>{actors.map((actor) => actor.name).join(", ")}</Typography>
      ) : (
        <Typography>
          {actors
            .slice(0, total)
            .map((actor) => actor.name)
            .join(", ")}
        </Typography>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            borderRadius: "20px",
            boxShadow: "none",
            color: "#000000",
            marginTop: "5px",
          }}
          color="inherit"
          variant="contained"
          size="small"
          endIcon={showAll ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          onClick={() => {
            setShowAll(!showAll);
            if (showAll) {
              setLimit(total);
            } else {
              setLimit(10);
            }
          }}
        >
          {showAll ? "Показать все" : "Свернуть"}
        </Button>
      </div>
    </>
  );
};
