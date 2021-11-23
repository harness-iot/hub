import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch';

export async function fetch<T>(
  url: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await nodeFetch(url, init);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<T>;
}
