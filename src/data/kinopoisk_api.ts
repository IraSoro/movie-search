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

export interface MovieControllerPossibleValuesByFieldNameResponse {
  name: string;
  slug: string;
}

async function movieControllerGetPossibleValuesByFieldName() {
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
  return (await resp.json()) as MovieControllerPossibleValuesByFieldNameResponse[];
}

interface MovieControllerSearchMovieOptions {
  page: number;
  limit: number;
  searchName: string;
}

interface MovieControllerSearchMovieDoc {
  id: number;
  name: string;
  poster: {
    url: string;
    previewUrl: string;
  };
}

interface MovieControllerSearchMovieResponse {
  docs: MovieControllerSearchMovieDoc[];
  total: number;
}

async function movieControllerSearchMovieV14(
  options: MovieControllerSearchMovieOptions,
) {
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

  return (await resp.json()) as MovieControllerSearchMovieResponse;
}

interface MovieControllerFindOneOptions {
  id: number;
}

interface SimilarMovie {
  id: number;
  name: string;
  poster: {
    url: string;
    previewUrl: string;
  };
}

export interface MovieControllerFindOneResponse {
  name: string;
  type: string;
  description: string;
  poster: { url: string };
  similarMovies: SimilarMovie[];
  rating: {
    kp: number;
  };
}

async function movieControllerFindOneV14(
  options: MovieControllerFindOneOptions,
) {
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/movie/${options.id}`,
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

  return (await resp.json()) as MovieControllerFindOneResponse;
}

interface ImageControllerFindManyOptions {
  page: number;
  limit: number;
  id: number;
}

export interface OneImage {
  id: string;
  url: string;
}

interface ImageControllerFindManyResponse {
  total: number;
  docs: OneImage[];
}

async function imageControllerFindManyV14(
  options: ImageControllerFindManyOptions,
) {
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/image?page=${options.page}&limit=${options.limit}&selectFields=url&notNullFields=url&movieId=${options.id}`,
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

  return (await resp.json()) as ImageControllerFindManyResponse;
}

interface PersonControllerFindManyOptions {
  page: number;
  limit: number;
  moviesId: number;
}

export interface PersonControllerFindManyDocs {
  name: string;
}

interface PersonControllerFindManyResponse {
  docs: PersonControllerFindManyDocs[];
  total: number;
}

async function personControllerFindManyV14(
  options: PersonControllerFindManyOptions,
) {
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/person?page=${options.page}&limit=${options.limit}&selectFields=name&notNullFields=name&movies.id=${options.moviesId}&profession.value=%D0%90%D0%BA%D1%82%D0%B5%D1%80`,
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

  return (await resp.json()) as PersonControllerFindManyResponse;
}

interface SeasonControllerFindManyOptions {
  page: number;
  limit: number;
  moviesId: number;
}

export interface SeasonControllerFindManyDocs {
  number: number;
  id: string;
}

interface SeasonControllerFindManyResponse {
  docs: SeasonControllerFindManyDocs[];
  total: number;
}

async function seasonControllerFindManyV14(
  options: SeasonControllerFindManyOptions,
) {
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/season?page=${options.page}&limit=${options.limit}&selectFields=number&movieId=${options.moviesId}`,
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

  return (await resp.json()) as SeasonControllerFindManyResponse;
}

interface ReviewControllerFindManyOptions {
  page: number;
  limit: number;
  moviesId: number;
}

export interface ReviewControllerFindManyDocs {
  review: string;
  author: string;
}

interface ReviewControllerFindManyResponse {
  docs: ReviewControllerFindManyDocs[];
  total: number;
}

async function reviewControllerFindManyV14(
  options: ReviewControllerFindManyOptions,
) {
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/review?page=${options.page}&limit=${options.limit}&selectFields=author&selectFields=review&notNullFields=author&notNullFields=review&movieId=${options.moviesId}`,
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

  return (await resp.json()) as ReviewControllerFindManyResponse;
}

interface MovieControllerFindManyByQuerySimilarMoviesOptions {
  page: number;
  limit: number;
  id: number;
}

export interface MovieControllerFindManyByQuerySimilarMoviesDoc {
  id: number;
  name: string;
  poster: {
    url: string;
    previewUrl: string;
  };
}

interface MovieControllerFindManyByQuerySimilarMoviesResponse {
  docs: [{ similarMovies: MovieControllerFindManyByQuerySimilarMoviesDoc[] }];
}

async function movieControllerFindManyByQuerySimilarMoviesV14(
  options: MovieControllerFindManyByQuerySimilarMoviesOptions,
) {
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/movie?page=${options.page}&limit=${options.limit}&selectFields=similarMovies&notNullFields=similarMovies.id&notNullFields=similarMovies.name&notNullFields=similarMovies.poster.url&id=${options.id}`,
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

  return (await resp.json()) as MovieControllerFindManyByQuerySimilarMoviesResponse;
}

export const kinopoiskApiV14 = {
  movieControllerFindManyByQuery: movieControllerFindManyByQueryV14,
  movieControllerGetPossibleValuesByFieldName:
    movieControllerGetPossibleValuesByFieldName,
  movieControllerSearchMovies: movieControllerSearchMovieV14,
  movieControllerFindOne: movieControllerFindOneV14,
  imageControllerFindMany: imageControllerFindManyV14,
  personControllerFindMany: personControllerFindManyV14,
  seasonControllerFindMany: seasonControllerFindManyV14,
  reviewControllerFindMany: reviewControllerFindManyV14,
  movieControllerFindSimilarMovies:
    movieControllerFindManyByQuerySimilarMoviesV14,
};
