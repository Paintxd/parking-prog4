import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class AuthFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    res.redirect('/');
  }
}
