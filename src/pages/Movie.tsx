import React from "react";
import { useParams } from "react-router-dom";

export default function Movie() {
  const { id } = useParams<string>();
  return (
    <>
      <p>Movie</p>
      <p>ID: {id}</p>
    </>
  );
}
