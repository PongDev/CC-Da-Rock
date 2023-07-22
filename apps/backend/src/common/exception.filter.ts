import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  EmailHasBeenSent,
  FailedRelationConstraintError,
  InvalidRequestError,
  PermissionError,
  RecordAlreadyExists,
  RecordNotFound,
} from './error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: Error, host: ArgumentsHost): void {
    console.log(exception);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const httpStatus =
      exception instanceof InvalidRequestError
        ? HttpStatus.BAD_REQUEST
        : exception instanceof PermissionError
        ? HttpStatus.UNAUTHORIZED
        : exception instanceof RecordNotFound
        ? HttpStatus.NOT_FOUND
        : exception instanceof RecordAlreadyExists
        ? HttpStatus.CONFLICT
        : exception instanceof FailedRelationConstraintError
        ? HttpStatus.BAD_REQUEST
        : exception instanceof EmailHasBeenSent
        ? HttpStatus.BAD_REQUEST
        : // for native error
        exception instanceof BadRequestException
        ? HttpStatus.BAD_REQUEST
        : exception instanceof UnauthorizedException
        ? HttpStatus.UNAUTHORIZED
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(httpStatus).json({
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof BadRequestException
          ? JSON.parse(JSON.stringify(exception.getResponse())).message
          : exception.message,
    });
  }
}
