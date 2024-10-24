import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiCombineResponse, ApiDefaultQuery } from '../../decorators';
import { Location, LocationAction } from '../../entities';
import {
  ErrorCodeEnum,
  HttpErrorStatusEnum,
  HttpSuccessStatusEnum,
} from '../../enums';
import { LocationQueryPipe, LocationValidatorPipe } from '../../pipes';
import { HttpExceptionOperators, HttpSuccessOperators } from '../../responses';
import { LocationService } from '../../services';
import { QueryRequest } from '../../types';
import { LocationWithoutIdVM, LocationWithRelationshipVM } from '../../vms';

@ApiTags('locations')
@ApiExtraModels(Location, LocationAction)
@Controller('api/locations')
export class LocationController {
  public constructor(protected readonly _service: LocationService) {}

  @ApiBody({
    type: LocationAction,
  })
  @ApiOperation({
    summary: 'Create location',
    description: 'Create location',
  })
  @ApiCombineResponse([
    {
      status: HttpSuccessStatusEnum.Created,
      description: 'Successful response',
      schema: {
        $ref: getSchemaPath(Location),
      },
      example: HttpSuccessOperators.createCreatedResponse({
        id: 'add583c8-18d3-4584-944c-de8ea693ba7a',
        building: 'A',
        name: 'A 01',
        number: 'A-01',
        area: '888.888',
        parentId: null,
        createdAt: '2023-05-01T00:00:00.000Z',
        updatedAt: '2023-05-01T00:00:00.000Z',
      }),
    },
    {
      status: HttpErrorStatusEnum.BadRequest,
      description: 'Bad request response',
      example: HttpExceptionOperators.createBadRequestErrorResponse([
        {
          code: ErrorCodeEnum.VALIDATING,
          metadata: {
            fields: [
              {
                name: 'building',
                message: 'Building is required',
              },
              {
                name: 'name',
                message: 'Name is required',
              },
              {
                name: 'number',
                message: 'Number is required',
              },
              {
                name: 'area',
                message: 'Area is required',
              },
            ],
          },
          message: 'Validation failed',
        },
      ]).getResponse(),
    },
  ])
  @Post()
  public async createAsync(
    @Body(new LocationValidatorPipe()) payload: LocationWithoutIdVM
  ) {
    const created = await this._service.createAsync(payload);
    console.log(
      `[LocationService] created location successfully: ${created.id}`
    );
    return HttpSuccessOperators.createCreatedResponse(created);
  }

  @ApiBody({
    type: LocationAction,
  })
  @ApiOperation({
    summary: 'Update location',
    description: 'Update location',
  })
  @ApiParam({
    name: 'id',
    description: 'Location id',
    type: String,
  })
  @ApiCombineResponse([
    {
      status: HttpSuccessStatusEnum.Created,
      description: 'Successful response',
      schema: {
        $ref: getSchemaPath(Location),
      },
      example: HttpSuccessOperators.createCreatedResponse({
        id: 'add583c8-18d3-4584-944c-de8ea693ba7a',
        building: 'A',
        name: 'A 01',
        number: 'A-01',
        area: '888.888',
        parentId: null,
        createdAt: '2023-05-01T00:00:00.000Z',
        updatedAt: '2023-05-01T00:00:00.000Z',
      }),
    },
    {
      status: HttpErrorStatusEnum.BadRequest,
      description: 'Bad request response',
      example: HttpExceptionOperators.createBadRequestErrorResponse([
        {
          code: ErrorCodeEnum.VALIDATING,
          metadata: {
            fields: [
              {
                name: 'building',
                message: 'Building is required',
              },
              {
                name: 'name',
                message: 'Name is required',
              },
              {
                name: 'number',
                message: 'Number is required',
              },
              {
                name: 'area',
                message: 'Area is required',
              },
            ],
          },
          message: 'Validation failed',
        },
      ]).getResponse(),
    },
    {
      status: HttpErrorStatusEnum.NotFound,
      description: 'Not found response',
      example: HttpExceptionOperators.createNotFoundErrorResponse([
        {
          code: HttpErrorStatusEnum.NotFound,
          message:
            'Not found location with [id: add583c8-18d3-4584-944c-de8ea693ba7a]',
        },
      ]).getResponse(),
    },
  ])
  @Put(':id')
  public async updateAsync(
    @Param('id') id: string,
    @Body(new LocationValidatorPipe(true)) payload: LocationWithoutIdVM
  ) {
    const location = await this._service.findByIdAsync(id);

    if (!location) {
      throw HttpExceptionOperators.createNotFoundErrorResponse([
        {
          code: HttpErrorStatusEnum.NotFound,
          message: `Not found location with [id: ${id}]`,
        },
      ]);
    }

    const updated = await this._service.updateAsync(id, payload);
    console.log(
      `[LocationService] updated location successfully: ${updated.id}`
    );
    return HttpSuccessOperators.createCreatedResponse(updated);
  }

  @ApiOperation({
    summary: 'Delete location',
    description: 'Delete location by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Location id',
    type: String,
  })
  @ApiCombineResponse([
    {
      status: HttpSuccessStatusEnum.NoContent,
      description: 'Successful response',
      example: HttpSuccessOperators.createNoContentResponse(),
    },
    {
      status: HttpErrorStatusEnum.NotFound,
      description: 'Not found response',
      example: HttpExceptionOperators.createNotFoundErrorResponse([
        {
          code: HttpErrorStatusEnum.NotFound,
          message:
            'Not found location with [id: add583c8-18d3-4584-944c-de8ea693ba7a]',
        },
      ]).getResponse(),
    },
  ])
  @Delete(':id')
  public async deleteAsync(@Param('id') id: string) {
    const location = await this._service.findByIdAsync(id);

    if (!location) {
      throw HttpExceptionOperators.createNotFoundErrorResponse([
        {
          code: HttpErrorStatusEnum.NotFound,
          message: `Not found location with [id: ${id}]`,
        },
      ]);
    }

    await this._service.deleteAsync(id);
    console.log(`[LocationService] deleted location successfully: ${id}`);
    return HttpSuccessOperators.createNoContentResponse();
  }

  @ApiOperation({
    summary: 'Get location by id',
    description: 'Get location by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Location id',
    type: String,
  })
  @ApiQuery({
    name: 'withRelationship',
    description: 'With relationship',
    required: false,
    type: Boolean,
  })
  @ApiCombineResponse([
    {
      status: HttpSuccessStatusEnum.Ok,
      description: 'Successful response',
      schema: {
        $ref: getSchemaPath(Location),
      },
      example: HttpSuccessOperators.createCreatedResponse({
        id: 'add583c8-18d3-4584-944c-de8ea693ba7a',
        building: 'A',
        name: 'A 01',
        number: 'A-01',
        area: '888.888',
        createdAt: '2023-05-01T00:00:00.000Z',
        updatedAt: '2023-05-01T00:00:00.000Z',
        parentId: null,
        children: [],
      }),
    },
    {
      status: HttpErrorStatusEnum.NotFound,
      description: 'Not found response',
      example: HttpExceptionOperators.createNotFoundErrorResponse([
        {
          code: HttpErrorStatusEnum.NotFound,
          message:
            'Not found location with [id: add583c8-18d3-4584-944c-de8ea693ba7a]',
        },
      ]).getResponse(),
    },
  ])
  @Get(':id')
  public async getByIdAsync(
    @Param('id') id: string,
    @Query('withRelationship') withRelationship: boolean
  ) {
    const location = await (withRelationship
      ? this._service.getTreeByIdAsync(id)
      : this._service.findByIdAsync(id));

    if (!location) {
      throw HttpExceptionOperators.createNotFoundErrorResponse([
        {
          code: HttpErrorStatusEnum.NotFound,
          message: `Not found location with [id: ${id}]`,
        },
      ]);
    }

    console.log(`[LocationService] getting location successfully: ${id}`);
    return HttpSuccessOperators.createOkResponse(location);
  }

  @ApiOperation({
    summary: 'Get locations',
    description: 'Get locations by query',
  })
  @ApiDefaultQuery(
    ['name', 'building', 'number', 'area'],
    {
      name: 'search',
      description: 'Search by name, building, number, area',
      example: 'A',
      required: false,
      type: String,
    },
    {
      name: 'withRelationship',
      description: 'With relationship',
      required: false,
      type: Boolean,
    }
  )
  @ApiCombineResponse([
    {
      status: HttpSuccessStatusEnum.Ok,
      description: 'Successful response',
      schema: {
        type: 'array',
        items: {
          $ref: getSchemaPath(Location),
        },
      },
      example: HttpSuccessOperators.createOkResponse(
        [
          {
            id: 'add583c8-18d3-4584-944c-de8ea693ba7a',
            building: 'A',
            name: 'A 01',
            number: 'A-01',
            area: '888.888',
            parentId: null,
            createdAt: '2023-05-01T00:00:00.000Z',
            updatedAt: '2023-05-01T00:00:00.000Z',
          },
          {
            id: 'add583c8-18d3-4584-944c-de8ea693ba7b',
            building: 'A',
            name: 'A 02',
            number: 'A-02',
            area: '888.888',
            parentId: null,
            createdAt: '2023-05-01T00:00:00.000Z',
            updatedAt: '2023-05-01T00:00:00.000Z',
          },
        ],
        {
          offset: 0,
          limit: 100,
          total: 2,
        }
      ),
    },
    {
      status: HttpSuccessStatusEnum.NoContent,
      description: 'Successful response',
      example: HttpSuccessOperators.createNoContentResponse({
        offset: 0,
        limit: 100,
        total: 0,
      }),
    },
  ])
  @Get()
  public async queryAsync(
    @Query(new LocationQueryPipe())
    query: QueryRequest<LocationWithRelationshipVM>,
    @Query('withRelationship') withRelationship: boolean
  ) {
    const { records, total } = await (withRelationship
      ? this._service.queryAllRootTreeAsync(query)
      : this._service.queryAsync(query));

    console.log(`[LocationService] query locations successfully: ${total}`);

    return HttpSuccessOperators.createOkResponse(records, {
      ...query.pagination,
      total,
    });
  }
}
