import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

export type PaginationRequest = {
  /**
   * Pagination limit
   * @example 10
   */
  limit: number;
  /**
   * Pagination offset
   * @example 1
   */
  offset: number;
};

export type QueryRequest<T> = {
  /**
   * Where statement
   * @example { "name": "A" }
   */
  where: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  /**
   * Query order
   * @example { "building": "ASC", "name": "DESC" }
   */
  order: FindOptionsOrder<T>;
  /**
   * Query Pagination
   * @example { "limit": 10, "offset": 0 }
   */
  pagination: PaginationRequest;
};
