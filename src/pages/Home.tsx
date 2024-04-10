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
  SelectChangeEvent,
  Stack,
  TablePagination,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import {
  kinopoiskApiV14,
  MovieControllerFindManyByQueryDoc,
} from "../data/kinopoisk_api";

interface PropsItem {
  movie: MovieControllerFindManyByQueryDoc;
}

const centerStyle = {
  display: "flex",
  justifyContent: "center",
};
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

const AgeRatingFilter = () => {
  const ageRatingList = ["0+", "6+", "12+", "16+", "18+"];
  const [ageRating, setAgeRating] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAgeRating(event.target.value);
  };

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, width: 110 }}
    >
      <InputLabel>Age Rating</InputLabel>
      <Select
        autoWidth
        value={ageRating}
        label="Year"
        onChange={handleChange}
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

const CountryFilter = () => {
  const countriesList = ["Russia", "USA", "Georgia", "China", "India"];
  const [country, setCountry] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, width: 90 }}
    >
      <InputLabel>Country</InputLabel>
      <Select
        autoWidth
        value={country}
        label="Year"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {countriesList.map((item) => (
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

const YearFilter = () => {
  const [year, setYear] = useState("");
  const [yearsList, setYearsList] = useState<number[]>([]);

  useEffect(() => {
    if (yearsList.length === 0) {
      for (let i = 1970; i <= 2024; i++) {
        yearsList.push(i);
      }
      setYearsList([...yearsList]);
    }
  }, [yearsList]);

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, width: 90 }}
    >
      <InputLabel>Year</InputLabel>
      <Select
        autoWidth
        value={year}
        label="Year"
        onChange={handleChange}
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

  useEffect(() => {
    kinopoiskApiV14
      .movieControllerFindManyByQuery({
        page: page + 1,
        limit: limit,
      })
      .then((resp) => {
        setArray(resp.docs);
        setTotal(resp.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, limit]);

  return (
    <div style={centerStyle}>
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
            <YearFilter />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <CountryFilter />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <AgeRatingFilter />
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
