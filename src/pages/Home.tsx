import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TablePagination,
  TextField,
  Typography,
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
import { debounce } from "../data/utils";

interface PropsItem {
  movie: MovieControllerFindManyByQueryDoc;
}

const Item: React.FC<PropsItem> = ({ movie }) => {
  return (
    <>
      <Box key={movie.id}>
        <Stack>
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
                src={movie.poster.url || "./assets/default.jpg"}
                loading="lazy"
              />
            </Box>
          </Link>
          <Typography>{movie.name || movie.alternativeName}</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [total, setTotal] = useState(0);
  const [array, setArray] = useState<MovieControllerFindManyByQueryDoc[]>([]);

  const defaultLimit = 10;
  const [search, setSearch] = useState(searchParams.get("query") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
  const [limit, setLimit] = useState(
    Number(searchParams.get("limit")) || defaultLimit,
  );

  const [year, setYear] = useState(searchParams.get("year") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [ageRating, setAgeRating] = useState(
    searchParams.get("ageRating") || "",
  );

  const [filtersSearch, setFiltersSearch] = useState(false);

  useEffect(() => {
    if (year !== "" || country !== "" || ageRating !== "") {
      setFiltersSearch(true);
    }
    if (!search.length || filtersSearch) {
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
    } else {
      kinopoiskApiV14
        .movieControllerSearchMovies({
          page: page + 1,
          limit: limit,
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
  }, [page, limit, year, country, ageRating, search, filtersSearch]);

  function clearFilters() {
    setYear("");
    setCountry("");
    setAgeRating("");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Stack>
        <Button
          sx={{
            marginTop: "5px",
            marginBottom: "5px",
            maxWidth: "200px",
            borderRadius: "15px",
            boxShadow: "none",
            marginLeft: "auto",
          }}
          color="inherit"
          variant="contained"
          size="small"
          onClick={() => {
            setSearchParams({
              query: "",
              page: "0",
              limit: defaultLimit.toString(),
              year: "",
              country: "",
              ageRating: "",
            });
            setFiltersSearch(!filtersSearch);
            setPage(0);
            setSearch("");
            clearFilters();
          }}
        >
          {filtersSearch ? "Поиск по названию" : "Поиск по фильтрам"}
        </Button>
        {filtersSearch && (
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
                setFilter={(newYear: string) => {
                  setYear(newYear);
                  setSearchParams({
                    page: page.toString(),
                    limit: defaultLimit.toString(),
                    year: newYear,
                    country: country,
                    ageRating: ageRating,
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <CountryFilter
                filter={country}
                setFilter={(newCountry: string) => {
                  setCountry(newCountry);
                  setSearchParams({
                    page: page.toString(),
                    limit: defaultLimit.toString(),
                    year: year,
                    country: newCountry,
                    ageRating: ageRating,
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <AgeRatingFilter
                filter={ageRating}
                setFilter={(newAgeRating: string) => {
                  setAgeRating(newAgeRating);
                  setSearchParams({
                    page: page.toString(),
                    limit: defaultLimit.toString(),
                    year: year,
                    country: country,
                    ageRating: newAgeRating,
                  });
                }}
              />
            </Grid>
          </Grid>
        )}
        {!filtersSearch && (
          <TextField
            sx={{ marginBottom: "15px", marginTop: "15px" }}
            id="outlined-basic"
            label="Поиск фильмов и сериалов"
            variant="outlined"
            defaultValue={search || ""}
            onChange={(event) => {
              debounce(() => {
                setSearchParams({
                  query: event.target.value,
                  page: "0",
                  limit: defaultLimit.toString(),
                });
                setSearch(event.target.value);
              }, 1 * 1000);
              setPage(0);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        )}
        <Box
          sx={{
            flexGrow: 1,
            width: 700,
            "@media (max-width: 600px)": {
              width: "auto",
            },
          }}
        >
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
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(event, newPage: number) => {
              setSearchParams({
                query: search,
                page: newPage.toString(),
                limit: limit.toString(),
                year: year,
                country: country,
                ageRating: ageRating,
              });
              setPage(newPage);
              globalThis.scrollTo({
                top: 0,
              });
            }}
            rowsPerPage={limit}
            onRowsPerPageChange={(event) => {
              setSearchParams({
                query: search,
                page: "0",
                limit: parseInt(event.target.value, 10).toString(),
                year: year,
                country: country,
                ageRating: ageRating,
              });
              setLimit(parseInt(event.target.value, 10));
              setPage(0);
            }}
            labelRowsPerPage="Лимит"
            labelDisplayedRows={({ count }) =>
              `${page + 1} из ${Math.ceil(count / limit)}`
            }
          />
        </Box>
      </Stack>
    </div>
  );
}
