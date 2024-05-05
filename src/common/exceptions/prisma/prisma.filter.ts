import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'src/common/interfaces/response/response.interface';
import { Response as ExpressResponse } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(`${exception.code}: ${exception.message}`);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const message = exception.message.replace(/\n/g, '');

    var statusCode: number;

    switch (exception.code) {
      case 'P2002': {
        statusCode = HttpStatus.CONFLICT;
        break;
      }
      case 'P2018': {
        statusCode = HttpStatus.NOT_FOUND;
        break;
      }
      case 'P2025': {
        statusCode = HttpStatus.NOT_FOUND;
        break;
      }
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
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
