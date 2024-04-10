import { pino, Logger } from 'pino'

export const logger: Logger = pino({
  name: 'REPORTES-SFTP',
  level: process.env.LOG_LEVEL || 'info',
});

