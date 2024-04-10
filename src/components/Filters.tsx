import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  kinopoiskApiV14,
  PossibleValuesByFieldNameResponse,
} from "../data/kinopoisk_api";

interface FilterProps {
  filter: string;
  setFilter: (_newValue: string) => void;
}

export const AgeRatingFilter = (props: FilterProps) => {
  const ageRatingList = [0, 6, 12, 16, 18];

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, width: 110 }}
    >
      <InputLabel>Age Rating</InputLabel>
      <Select
        autoWidth
        value={props.filter}
        label="Year"
        onChange={(event) => {
          props.setFilter(event.target.value);
        }}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {ageRatingList.map((item) => (
          <MenuItem
            key={item}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const CountryFilter = (props: FilterProps) => {
  const [countriesList, setCountriesList] = useState<
    PossibleValuesByFieldNameResponse[]
  >([]);

  useEffect(() => {
    if (countriesList.length !== 0) return;
    kinopoiskApiV14
      .getPossibleValuesByFieldName()
      .then((resp) => {
        setCountriesList(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, width: 90 }}
    >
      <InputLabel>Country</InputLabel>
      <Select
        autoWidth
        value={props.filter}
        label="Year"
        onChange={(event) => {
          props.setFilter(event.target.value);
        }}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {countriesList.map((item, index) => (
          <MenuItem
            key={index}
            value={item.name}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const YearFilter = (props: FilterProps) => {
  const [yearsList, setYearsList] = useState<number[]>([]);

  useEffect(() => {
    if (yearsList.length === 0) {
      for (let i = 2024; i >= 1970; i--) {
        yearsList.push(i);
      }
      setYearsList([...yearsList]);
    }
  }, [yearsList]);

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, width: 90 }}
    >
      <InputLabel>Year</InputLabel>
      <Select
        autoWidth
        value={props.filter}
        label="Year"
        onChange={(event) => {
          props.setFilter(event.target.value);
        }}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {yearsList.map((item) => (
          <MenuItem
            key={item}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
