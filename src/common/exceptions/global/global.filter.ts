import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'src/common/interfaces/response/response.interface';
import {Response as ExpressResponse} from 'express';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    }

    const errorResponse: Response<null> = {
      status: false,
      statusCode,
      message,
      data: null,
    };

    response.status(statusCode).json(errorResponse);
  }
}
