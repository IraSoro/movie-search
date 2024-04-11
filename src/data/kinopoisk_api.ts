const token = process.env.TOKEN as string;

interface MovieControllerFindManyByQueryOptions {
  page: number;
  limit: number;
  year: string;
  country: string;
  ageRating: string;
}

export interface MovieControllerFindManyByQueryDoc {
  id: number;
  name: string;
  poster: {
    url: string;
    previewUrl: string;
  };
}

interface MovieControllerFindManyByQueryResponse {
  docs: MovieControllerFindManyByQueryDoc[];
  total: number;
}

async function movieControllerFindManyByQueryV14(
  options: MovieControllerFindManyByQueryOptions,
) {
  const additionallyOptions =
    (options.year ? `&year=${options.year}` : "") +
    (options.country
      ? `&countries.name=${encodeURIComponent(options.country)}`
      : "") +
    (options.ageRating ? `&ageRating=${options.ageRating}` : "");
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/movie?page=${options.page}&limit=${options.limit}&selectFields=id&selectFields=name&selectFields=poster&notNullFields=id&notNullFields=name&notNullFields=poster.url${additionallyOptions}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": token,
      },
    },
  );

  if (resp.status !== 200) {
    // TODO: Make custom error type
    throw new Error(`Server returned incorrect status '${resp.status}'`);
  }

  return (await resp.json()) as MovieControllerFindManyByQueryResponse;
}

// ---------------------------

export interface PossibleValuesByFieldNameResponse {
  name: string;
  slug: string;
}

async function getPossibleValuesByFieldName() {
  const resp = await fetch(
    "https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": token,
      },
    },
  );

  if (resp.status !== 200) {
    // TODO: Make custom error type
    throw new Error(`Server returned incorrect status '${resp.status}'`);
  }
  return (await resp.json()) as PossibleValuesByFieldNameResponse[];
}

// ------------------------

interface SearchMovieOptions {
  page: number;
  limit: number;
  searchName: string;
}

interface SearchMovieDoc {
  id: number;
  name: string;
  poster: {
    url: string;
    previewUrl: string;
  };
}

interface SearchMovieResponse {
  docs: SearchMovieDoc[];
  total: number;
}

async function searchMovieV14(options: SearchMovieOptions) {
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/movie/search?page=${options.page}&limit=${options.limit}&query=${options.searchName}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": token,
      },
    },
  );

  if (resp.status !== 200) {
    // TODO: Make custom error type
    throw new Error(`Server returned incorrect status '${resp.status}'`);
  }

  return (await resp.json()) as SearchMovieResponse;
}

export const kinopoiskApiV14 = {
  movieControllerFindManyByQuery: movieControllerFindManyByQueryV14,
  getPossibleValuesByFieldName: getPossibleValuesByFieldName,
  searchMovies: searchMovieV14,
};
