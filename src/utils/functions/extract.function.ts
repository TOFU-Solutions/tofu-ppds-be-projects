import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * @function extract
 * @description extract the token from the request
 * @param {JwtService} service {@link JwtService}
 * @param {Request} request {@link Request}
 * @returns {any} the decoded token
 */
export function extract(service: JwtService, request: Request) {
  const logger = new Logger(`fn<extract>`, { timestamp: true });
  logger.debug(`Enter function `);
  logger.debug(`contents = ${JSON.stringify(request.headers)}`);
  const token = request.headers.authorization?.replace('Bearer ', '');
  logger.debug(`token = ${token}`);
  return service.decode(token);
}
