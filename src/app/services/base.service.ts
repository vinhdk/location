import { isArray, omit } from 'lodash';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CanNull, QueryRequest } from '../types';
import { BaseVM } from '../vms';

/**
 * @description Base service for all entities
 */
export class BaseService<T extends BaseVM> {
  public constructor(protected readonly _repository: Repository<T>) {}

  /**
   * @description Create a new entity
   * @param record {Omit<T, 'id'>} - Record to create
   * @returns {Promise<T>} Created entity
   */
  public async createAsync(record: Partial<Omit<T, 'id'>>): Promise<T> {
    return this._repository.save(
      omit(record, 'id') as unknown as DeepPartial<T>
    );
  }

  /**
   * @description Update a new entity
   * @param id {string} - Id of entity to update
   * @param record {Omit<T, 'id'>} - Record to update
   * @returns {Promise<T>} Updated entity
   */
  public async updateAsync(
    id: string,
    record: Partial<Omit<T, 'id'>>
  ): Promise<T> {
    if (!id) {
      throw new Error('id is required');
    }

    await this._repository.update(
      id,
      omit(record, 'id') as unknown as QueryDeepPartialEntity<T>
    );

    return this.findByIdAsync(id);
  }

  /**
   * @description Delete a new entity
   * @param id {string} - Id of entity to delete
   * @returns {Promise<void>}
   */
  public async deleteAsync(id: string): Promise<void> {
    if (!id) {
      throw new Error('id is required');
    }

    await this._repository.delete(id);
  }

  /**
   * @description Find a new entity by id
   * @param id {string} - Id of entity to find
   * @param extraQuery {FindOneOptions<T> | undefined} - Extra query options, default is empty object
   * @returns {Promise<CanNull<T>>} Found entity
   */
  public async findByIdAsync(
    id: string,
    extraQuery: FindOneOptions<T> = {}
  ): Promise<CanNull<T>> {
    if (!id) {
      return null;
    }

    return this._repository.findOne({
      where: {
        id,
        ...extraQuery.where,
      },
      ...omit(extraQuery, 'where'),
    } as FindOneOptions<T>);
  }

  /**
   * @description Query entities
   * @param query {Partial<QueryRequest<T>>} - Query options
   * @param extraQuery {FindManyOptions<T> | undefined} - Extra query options, default is empty object
   * @returns {Promise<T[]>} Found entities
   */
  public async queryAsync(
    query: Partial<QueryRequest<T>> = {},
    extraOptions: Omit<FindManyOptions<T>, 'where'> = {}
  ): Promise<{ records: T[]; total: number }> {
    const operator = this.generateOperator(query);
    const records = await this._repository.find({
      where: [...(isArray(operator.where) ? operator.where : [operator.where])],
      ...omit(operator, 'where'),
      ...extraOptions,
    });
    const total = await this._repository.count({
      where: [...(isArray(operator.where) ? operator.where : [operator.where])],
    });

    return {
      records,
      total,
    };
  }

  /**
   * @description Generate operator for query
   * @param query {Partial<QueryRequest<T>>} - Query options
   * @returns {FindManyOptions<T>} Operator for query
   */
  public generateOperator(
    query: Partial<QueryRequest<T>> = {}
  ): FindManyOptions<T> {
    const { where, order, pagination } = query;
    const defaultPagination = pagination ?? { limit: 10, offset: 0 };
    return {
      where,
      take: +(defaultPagination.limit ?? 10),
      skip: +(defaultPagination.offset ?? 0) * +(defaultPagination.limit ?? 10),
      order,
    };
  }
}
