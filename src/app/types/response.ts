import {
  ErrorCodeEnum,
  HttpErrorStatusEnum,
  HttpSuccessStatusEnum,
} from '../enums';
import { SafeAny } from '../types';
import { PaginationRequest } from './request';

export type SuccessResponse<TData, TMetadata extends SafeAny = SafeAny> = {
  /**
   * @description Data of response, passed from the dependent type
   */
  data: TData;
  /**
   * @description status of success response
   */
  status: HttpSuccessStatusEnum;
} & (TMetadata extends never
  ? { metadata?: undefined }
  : { metadata: TMetadata });

export type ErrorResponse = {
  /**
   * @description List of errors
   */
  errors: CombineError[];
  /**
   * @description status of error response
   */
  status: HttpErrorStatusEnum;
};

export type CombineError = {
  message: string;
} & (
  | {
      /**
       * @description code of validating error, the custom error of our system
       */
      code: ErrorCodeEnum.VALIDATING;
      /**
       * @description metadata is containing all fields that are invalid
       */
      metadata: {
        fields: { name: string; message: string }[];
      };
    }
  | {
      /**
       * @description code of basic error
       */
      code: HttpErrorStatusEnum;
      /**
       * @description metadata of basic error, anything can be passed
       */
      metadata?: SafeAny;
    }
);

export type PaginationMetadata = {
  /**
   * @description Total number of items
   * @example 1000
   */
  total: number;
} & PaginationRequest;
