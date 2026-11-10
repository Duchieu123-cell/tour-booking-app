export interface ListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: ListMeta;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    details?: unknown;
  };
}
