import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  Stack,
  TablePagination,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
  YearFilter,
  CountryFilter,
  AgeRatingFilter,
} from "../components/Filters";

import {
  kinopoiskApiV14,
  MovieControllerFindManyByQueryDoc,
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
              width: "auto",
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

export default function Home() {
  const [total, setTotal] = useState(0);
  const [array, setArray] = useState<MovieControllerFindManyByQueryDoc[]>([]);

  const [search, setSearch] = useState("");
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

  function searchMovie() {
    kinopoiskApiV14
      .movieControllerSearchMovies({
        page: page + 1,
        limit: 10,
        searchName: search,
      })
      .then((resp) => {
        setArray(resp.docs);
        setTotal(resp.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
          label="Поиск фильмов и сериалов"
          variant="outlined"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    searchMovie();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Box
          sx={{
            flexGrow: 1,
            width: 700,
            "@media (max-width: 600px)": {
              width: "auto",
            },
          }}
        >
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
            labelRowsPerPage="Лимит"
            labelDisplayedRows={({ count }) =>
              `${page + 1} из ${Math.ceil(count / limit)}`
            }
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
