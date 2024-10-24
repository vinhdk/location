import { applyDecorators } from '@nestjs/common';
import {
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

export function ApiCombineResponse(responses: ApiResponseOptions[]) {
  return applyDecorators(...responses.map(response => ApiResponse(response)));
}

export function ApiCombineQuery(queries: ApiQueryOptions[]) {
  return applyDecorators(...queries.map(query => ApiQuery(query)));
}
