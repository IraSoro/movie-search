import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, MobileStepper, Button } from "@mui/material";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { kinopoiskApiV14, OneImage } from "../data/kinopoisk_api";

export const SwiperPosters = () => {
  const { id } = useParams<string>();
  const [images, setImages] = useState<OneImage[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    kinopoiskApiV14
      .imageControllerFindMany({
        page: 1,
        limit: 10,
        id: Number(id),
      })
      .then((resp) => {
        setImages(resp.docs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: 700,
        "@media (max-width: 600px)": {
          width: "auto",
        },
      }}
    >
      <MobileStepper
        steps={images.length}
        position="static"
        activeStep={activeStep}
        elevation={0}
        nextButton={
          <Button
            size="small"
            color="inherit"
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }}
            disabled={activeStep === images.length - 1}
          >
            <NavigateNextIcon />
          </Button>
        }
        backButton={
          <Button
            size="small"
            color="inherit"
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep - 1);
            }}
            disabled={activeStep === 0}
          >
            <NavigateBeforeIcon />
          </Button>
        }
      />
      <Box
        component="img"
        sx={{
          height: "auto",
          maxWidth: 500,
          "@media (max-width: 600px)": {
            maxWidth: 300,
          },
          display: "block",
          overflow: "hidden",
          margin: "0 auto",
        }}
        src={
          images.length !== 0 ? images[activeStep].url : "assets/default.jpg"
        }
        alt={`image ${activeStep + 1}`}
      />
    </Box>
  );
};
