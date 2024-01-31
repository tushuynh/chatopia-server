import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

export class ApiResponse<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest() as Request;
    console.log('request: ', request.headers);
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          data,
        };
      }),
    );
  }
}
