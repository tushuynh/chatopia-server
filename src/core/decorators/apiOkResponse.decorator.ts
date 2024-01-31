import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  getSchemaPath,
  ApiResponse as ApiResponseSwagger,
} from '@nestjs/swagger';
import { ApiResponse } from '../interceptors/response.interceptor';

export const ApiResponseCustom = <GenericType extends Type<unknown>>(
  status: number,
  data: GenericType,
  isArray = false,
) =>
  applyDecorators(
    ApiExtraModels(ApiResponse, data),
    ApiResponseSwagger({
      description: `The result of ${data.name}`,
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          {
            properties: {
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(data) },
                  }
                : {
                    type: 'object',
                    $ref: getSchemaPath(data),
                  },
            },
          },
        ],
      },
    }),
  );
