import { ApiQueryOptions } from '@nestjs/swagger';
import { ApiCombineQuery } from './combine';

export function ApiDefaultQuery(
  orderFields: string[] = [],
  ...queries: ApiQueryOptions[]
) {
  return ApiCombineQuery([
    ...orderFields.map(field => ({
      enum: ['ASC', 'DESC'],
      name: `order[${field}]`,
      example: 'ASC',
      description: `Query Order By ${field}`,
      required: false,
    })),
    {
      type: Number,
      name: 'pagination[limit]',
      example: 100,
      description: 'Query Pagination Limit',
      required: false,
    },
    {
      type: Number,
      name: 'pagination[offset]',
      example: 0,
      description: 'Query Pagination Offset',
      required: false,
    },
    ...queries,
  ]);
}
