import { Injectable, PipeTransform } from '@nestjs/common';
import { omit } from 'lodash';
import { ILike, IsNull } from 'typeorm';
import { QueryRequest } from '../types';
import { LocationWithRelationshipVM } from '../vms';

@Injectable()
export class LocationQueryPipe implements PipeTransform {
  public transform(
    query: Omit<QueryRequest<LocationWithRelationshipVM>, 'where'> & {
      search: string;
      withRelationship: boolean;
    }
  ): QueryRequest<LocationWithRelationshipVM> {
    return {
      ...omit(query, 'search'),
      where: query.search
        ? ['name', 'building', 'number', 'area'].map(key => ({
            [key]: ILike(`%${query.search}%`),
            ...(`${query.withRelationship}` === 'true'
              ? { parentId: IsNull() }
              : {}),
          }))
        : [],
    };
  }
}
