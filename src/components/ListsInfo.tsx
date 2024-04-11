import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import {
  kinopoiskApiV14,
  PersonControllerFindManyDocs,
} from "../data/kinopoisk_api";

export const ListActors = () => {
  const { id } = useParams<string>();
  const [total, setTotal] = useState(10);
  const [limit, setLimit] = useState(10);
  const [actors, setActors] = useState<PersonControllerFindManyDocs[]>([]);
  const [showAll, setShowAll] = useState(false);

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
        {!showAll && actors.length < total ? (
          <Typography
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#474d4e",
              marginBottom: "15px",
            }}
            onClick={() => {
              setShowAll(true);
              setLimit(total);
            }}
          >
            Show All
          </Typography>
        ) : (
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
            Return
          </Typography>
        )}
      </>
    );
};
