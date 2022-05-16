import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export interface ILog {
  userId: string; // ない場合は"-"
  message: string;
  module: string; // クラス名、関数名
  method: string;
}

@Injectable()
export class CustomLoggerService implements LoggerService {
  logger: Logger;

  constructor() {
    // infoログ（通常ログ）の出力先を定義
    const applicationLogTransport: DailyRotateFile = new DailyRotateFile({
      level: 'info',
      filename: 'all-%DATE%.log',
      dirname: 'log',
      datePattern: 'YYYYMMDD',
      maxFiles: '32d',
    });

    // errorログの出力先を定義
    const errorLogTransport: DailyRotateFile = new DailyRotateFile({
      level: 'error',
      filename: 'error-%DATE%.log',
      dirname: 'log',
      datePattern: 'YYYYMMDD',
      maxFiles: '32d',
    });

    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      defaultMeta: { service: 'ARTRIRE' },
      transports: [applicationLogTransport, errorLogTransport],
    });
  }

  // info
  log(props: ILog) {
    this.logger.info({
      message: props.message,
      method: props.method,
      module: props.module,
      userId: props.userId,
    });
  }

  error(props: ILog, trace: string) {
    this.logger.error(trace, {
      message: props.message,
      method: props.method,
      module: props.module,
      userId: props.userId,
    });
  }

  warn(props: ILog) {
    this.logger.warn({
      message: props.message,
      method: props.method,
      module: props.module,
      userId: props.userId,
    });
  }

  debug(props: ILog) {
    this.logger.debug({
      message: props.message,
      method: props.method,
      module: props.module,
      userId: props.userId,
    });
  }

  verbose(props: ILog) {
    this.logger.verbose({
      message: props.message,
      method: props.method,
      module: props.module,
      userId: props.userId,
    });
  }
}
