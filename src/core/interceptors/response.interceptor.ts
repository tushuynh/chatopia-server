import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
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
