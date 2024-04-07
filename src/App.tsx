import React, { useState } from "react";
import {
  Box,
  Grid,
  ImageListItem,
  ImageListItemBar,
  Link,
  Stack,
  TextField,
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
  const [_searchPic, setSearchPic] = useState("");

  const array = [1, 2, 3, 4, 5];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPic(event.target.value);
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
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
          >
            {Array.from(array).map((item, idx) => (
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
