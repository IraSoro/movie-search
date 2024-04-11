import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import {
  kinopoiskApiV14,
  PersonControllerFindManyDocs,
  SeasonControllerFindManyDocs,
} from "../data/kinopoisk_api";

export const ListSeasons = () => {
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

  if (seasons.length === 0) return <Typography>No information</Typography>;
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
            ? seasons.map((season, index) => (
                <Typography key={index}>{`Season ${season.number}`}</Typography>
              ))
            : seasons
                .slice(0, total)
                .map((season, index) => (
                  <Typography
                    key={index}
                  >{`Season ${season.number}`}</Typography>
                ))}
        </ul>
        {showAll && seasons.length < total && (
          <Typography
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#474d4e",
              marginBottom: "15px",
            }}
            onClick={() => {
              setShowAll(false);
              setFold(true);
              setLimit(total);
            }}
          >
            Show All
          </Typography>
        )}
        {fold && (
          <Typography
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#474d4e",
              marginBottom: "15px",
            }}
            onClick={() => {
              setShowAll(false);
              setLimit(10);
            }}
          >
            Fold
          </Typography>
        )}
      </>
    );
};

export const ListActors = () => {
  const { id } = useParams<string>();
  const [total, setTotal] = useState(10);
  const [limit, setLimit] = useState(10);
  const [actors, setActors] = useState<PersonControllerFindManyDocs[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [fold, setFold] = useState(false);

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

  if (actors.length === 0) return <Typography>No information</Typography>;
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
            ? actors.map((actor, index) => (
                <Typography key={index}>{actor.name}</Typography>
              ))
            : actors
                .slice(0, total)
                .map((item, index) => (
                  <Typography key={index}>{item.name}</Typography>
                ))}
        </ul>
        {showAll && actors.length < total && (
          <Typography
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#474d4e",
              marginBottom: "15px",
            }}
            onClick={() => {
              setShowAll(false);
              setFold(true);
              setLimit(total);
            }}
          >
            Show All
          </Typography>
        )}
        {fold && (
          <Typography
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#474d4e",
              marginBottom: "15px",
            }}
            onClick={() => {
              setShowAll(false);
              setLimit(10);
            }}
          >
            Fold
          </Typography>
        )}
      </>
    );
};
