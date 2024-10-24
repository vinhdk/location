import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities';
import { CanNull, QueryRequest } from '../types';
import { LocationWithRelationshipVM } from '../vms';
import { BaseService } from './base.service';

@Injectable()
export class LocationService extends BaseService<LocationWithRelationshipVM> {
  public constructor(
    @InjectRepository(Location)
    protected readonly _repository: Repository<LocationWithRelationshipVM>
  ) {
    super(_repository);
  }

  /**
   * @description Get a location by id, with their relationship
   * @param id {string} - Id of location to get
   * @returns {Promise<CanNull<LocationWithRelationshipVM>>} Found location with their relationship
   */
  public async getTreeByIdAsync(
    id: string
  ): Promise<CanNull<LocationWithRelationshipVM>> {
    const location = await this.findByIdAsync(id, {
      relations: ['children'],
    });

    if (!location) {
      return null;
    }

    const children: LocationWithRelationshipVM[] = [];

    for (const { id } of location.children) {
      const child = await this.getTreeByIdAsync(id);

      if (child) {
        children.push(child);
      }
    }

    return {
      ...location,
      children,
    };
  }

  /**
   * @description Query all root locations
   * @param query {Partial<QueryRequest<LocationWithRelationshipVM>>} - Query options
   * @returns {Promise<LocationWithRelationshipVM[]>} Found locations with their relationship
   */
  public async queryAllRootTreeAsync(
    query: Partial<QueryRequest<LocationWithRelationshipVM>> = {}
  ): Promise<{ records: LocationWithRelationshipVM[]; total: number }> {
    const { records, total } = await this.queryAsync(query);

    const locations: LocationWithRelationshipVM[] = [];

    for (const record of records) {
      const children = await this.getTreeByIdAsync(record.id);

      if (children) {
        locations.push(children);
      }
    }

    return { records: locations, total };
  }
}
