import { HttpException } from '@nestjs/common';
import { HttpErrorStatusEnum } from '../enums';
import { ErrorResponse } from '../types';

function createErrorResponse(response: ErrorResponse): HttpException {
  return new HttpException({ errors: response.errors }, response.status);
}

function createAllErrorResponses() {
  return Object.entries(HttpErrorStatusEnum).reduce(
    (acc, entry) => ({
      ...acc,
      [`create${entry[0]}ErrorResponse`]: (errors: ErrorResponse['errors']) =>
        createErrorResponse({
          errors,
          status: entry[1] as HttpErrorStatusEnum,
        }),
    }),
    {} as Record<
      `create${keyof typeof HttpErrorStatusEnum}ErrorResponse`,
      (errors: ErrorResponse['errors']) => HttpException
    >
  );
}

export const HttpExceptionOperators = {
  ...createAllErrorResponses(),
  createErrorResponse,
};
