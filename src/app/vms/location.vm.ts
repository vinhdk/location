import { CanNull } from '../types';
import { BaseVM } from './base.vm';

export type LocationVM = LocationWithoutIdVM & BaseVM;

export type LocationWithRelationshipVM = LocationVM & {
  /**
   * List of Children locations
   * @example []
   */
  children: LocationWithRelationshipVM[];
};

export interface LocationWithoutIdVM {
  /**
   * Building
   * @example 'A'
   */
  building: string;
  /**
   * Name
   * @example 'A 01'
   */
  name: string;
  /**
   * Number
   * @example 'A-01'
   */
  number: string;
  /**
   * Area
   * @example '88.8888'
   */
  area: string;
  /**
   * Parent of location
   * @example null
   */
  parentId: CanNull<string>;
}
