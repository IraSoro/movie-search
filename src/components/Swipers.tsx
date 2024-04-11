import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, MobileStepper, Button } from "@mui/material";

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
    <Box sx={{ flexGrow: 1 }}>
      <MobileStepper
        steps={images.length}
        position="static"
        activeStep={activeStep}
        elevation={0}
        nextButton={
          <Button
            size="small"
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }}
            disabled={activeStep === images.length - 1}
          >
            Next
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep - 1);
            }}
            disabled={activeStep === 0}
          >
            Back
          </Button>
        }
      />
      <Box
        component="img"
        sx={{
          height: "auto",
          maxWidth: "100%",
          display: "block",
          overflow: "hidden",
        }}
        src={
          images.length !== 0 ? images[activeStep].url : "assets/default.jpg"
        }
        alt={`image ${activeStep + 1}`}
      />
    </Box>
  );
};
