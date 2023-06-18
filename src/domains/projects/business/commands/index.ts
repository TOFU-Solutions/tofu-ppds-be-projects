import { ClientCreateCommandHandler } from './client-create.handler';
import { ClientUpdateCommandHandler } from './client-update.handler';

/**
 * @const {Array} commands the list of commands
 * @since 0.0.1
 * @author Mark Leung <leungas@gmail.com>
 */
export const commands = [
  ClientCreateCommandHandler,
  ClientUpdateCommandHandler,
];
