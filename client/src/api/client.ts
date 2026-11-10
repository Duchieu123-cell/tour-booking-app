import type { ApiErrorResponse } from '../types/api';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const json: unknown = await response.json();

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    let details: unknown = undefined;

    if (
      json !== null &&
      typeof json === 'object' &&
      'error' in json &&
      typeof (json as ApiErrorResponse).error === 'object' &&
      (json as ApiErrorResponse).error !== null
    ) {
      const errObj = (json as ApiErrorResponse).error;
      if (typeof errObj.message === 'string') {
        message = errObj.message;
      }
      details = errObj.details;
    }

    throw new ApiError(message, response.status, details);
  }

  return json as T;
}
