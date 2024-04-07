import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  ImageListItem,
  ImageListItemBar,
  Link,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";

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
        <Link href={``}>
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

export default function App() {
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
        <TextField
          sx={{ marginBottom: "15px" }}
          id="outlined-basic"
          label="Search for movies and TV series"
          variant="outlined"
          onChange={handleSearchChange}
        />
        <Box sx={{ flexGrow: 1, maxWidth: 700 }}>
          <Typography>Page: {page + 1}</Typography>
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
