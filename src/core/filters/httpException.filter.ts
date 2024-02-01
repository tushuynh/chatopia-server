import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ERROR_MESSAGE } from '@shared/constants';
import { Response } from 'express';

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: any;
}

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as Error;

    return response.status(status).json({
      success: false,
      message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
}
