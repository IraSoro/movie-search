import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TablePagination,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import {
  kinopoiskApiV14,
  MovieControllerFindManyByQueryDoc,
  PossibleValuesByFieldNameResponse,
} from "../data/kinopoisk_api";

interface PropsItem {
  movie: MovieControllerFindManyByQueryDoc;
}

const Item: React.FC<PropsItem> = ({ movie }) => {
  return (
    <>
      <ImageListItem key={movie.id}>
        <Link to={`movies/${movie.id}`}>
          <Box
            sx={{
              height: 350,
              maxWidth: 250,
              "@media (max-width: 600px)": {
                height: 250,
                maxWidth: 180,
              },
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
              }}
              src={movie.poster.url}
              loading="lazy"
            />
          </Box>
        </Link>
        <ImageListItemBar
          title={movie.name}
          position="below"
        />
      </ImageListItem>
    </>
  );
};

interface FilterProps {
  filter: string;
  setFilter: (_newValue: string) => void;
}

const AgeRatingFilter = (props: FilterProps) => {
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

const CountryFilter = (props: FilterProps) => {
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

const YearFilter = (props: FilterProps) => {
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

export default function Home() {
  const [total, setTotal] = useState(0);
  const [array, setArray] = useState<MovieControllerFindManyByQueryDoc[]>([]);

  const [_search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [ageRating, setAgeRating] = useState("");

  useEffect(() => {
    kinopoiskApiV14
      .movieControllerFindManyByQuery({
        page: page + 1,
        limit: limit,
        year: year,
        country: country,
        ageRating: ageRating,
      })
      .then((resp) => {
        setArray(resp.docs);
        setTotal(resp.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, limit, year, country, ageRating]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Stack>
        <Grid
          container
          alignItems="start"
          sx={{ maxWidth: "280px" }}
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <YearFilter
              filter={year}
              setFilter={setYear}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <CountryFilter
              filter={country}
              setFilter={setCountry}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <AgeRatingFilter
              filter={ageRating}
              setFilter={setAgeRating}
            />
          </Grid>
        </Grid>
        <TextField
          sx={{ marginBottom: "15px", marginTop: "15px" }}
          id="outlined-basic"
          label="Search for movies and series"
          variant="outlined"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Box sx={{ flexGrow: 1, maxWidth: 700 }}>
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(event, newPage: number) => {
              setPage(newPage);
            }}
            rowsPerPage={limit}
            onRowsPerPageChange={(event) => {
              setLimit(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
          >
            {Array.from(array).map((movie, idx) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                key={idx}
              >
                <Item movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </div>
  );
}
