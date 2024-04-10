const token = process.env.TOKEN as string;

interface MovieControllerFindManyByQueryOptions {
  page: number;
  limit: number;
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
  const resp = await fetch(
    `https://api.kinopoisk.dev/v1.4/movie?page=${options.page}&limit=${options.limit}&selectFields=id&selectFields=name&selectFields=poster&notNullFields=id&notNullFields=name&notNullFields=poster.url`,
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

export const kinopoiskApiV14 = {
  movieControllerFindManyByQuery: movieControllerFindManyByQueryV14,
};
