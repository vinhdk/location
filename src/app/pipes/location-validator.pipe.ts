import { Injectable, PipeTransform } from '@nestjs/common';
import { ErrorCodeEnum } from '../enums';
import { HttpExceptionOperators } from '../responses';
import { LocationWithoutIdVM } from '../vms';

@Injectable()
export class LocationValidatorPipe<T extends Partial<LocationWithoutIdVM>>
  implements PipeTransform<T>
{
  public constructor(private readonly partial = false) {}

  public transform(value: T): T {
    if (this.partial) {
      return value;
    }

    const keys = Object.keys(value);

    const fields = ['building', 'name', 'number', 'area']
      .map(key =>
        keys.includes(key)
          ? !value[key]
            ? { name: key, message: `${key} is required` }
            : null
          : {
              name: key,
              message: `${key} is missing`,
            }
      )
      .filter(error => !!error);

    if (fields.length) {
      throw HttpExceptionOperators.createBadRequestErrorResponse([
        {
          code: ErrorCodeEnum.VALIDATING,
          metadata: {
            fields,
          },
          message: 'Validation failed',
        },
      ]);
    }

    return value;
  }
}
