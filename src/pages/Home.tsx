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

interface PropsItem {
  item: string;
  idx: number;
}

const centerStyle = {
  display: "flex",
  justifyContent: "center",
};

const Item = (props: PropsItem) => {
  return (
    <>
      <ImageListItem key={props.idx}>
        <Link to={`movies/${props.item}`}>
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
              src="/assets/default.jpg"
              loading="lazy"
            />
          </Box>
        </Link>
        <ImageListItemBar
          title={props.item}
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
  const maxCount = 100;
  const [array, setArray] = useState<number[]>([]);
  const [showArray, setShowArray] = useState<number[]>([]);
  const [_searchPic, setSearchPic] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (array.length === 0) {
      for (let i = 1; i <= maxCount; i++) {
        array.push(i);
      }
      setArray([...array]);
    }
    const newArray = array.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
    setShowArray(newArray);
  }, [array, page, rowsPerPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPic(event.target.value);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          onChange={handleSearchChange}
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
            count={maxCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
          >
            {Array.from(showArray).map((item, idx) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                key={idx}
              >
                <Item
                  item={item.toString()}
                  idx={idx}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </div>
  );
}
