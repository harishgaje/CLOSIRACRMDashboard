/**
 * Enterprise-grade logging utility for analytics and debugging
 * Supports different log levels and can be easily connected to external services
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: Record<string, any>;
  stack?: string;
}

class Logger {
  private isDevelopment = __DEV__;
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, data } = entry;
    const dataStr = data ? ` | ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataStr}`;
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // In production, send to analytics service
    if (!this.isDevelopment) {
      this.sendToAnalytics(entry);
    }
  }

  private sendToAnalytics(_entry: LogEntry): void {
    // Analytics transport can be connected here for production builds.
  }

  debug(message: string, data?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'debug',
      message,
      data,
    };
    if (this.isDevelopment) console.debug(this.formatLog(entry));
    this.addLog(entry);
  }

  info(message: string, data?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      data,
    };
    if (this.isDevelopment) console.info(this.formatLog(entry));
    this.addLog(entry);
  }

  warn(message: string, data?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      data,
    };
    console.warn(this.formatLog(entry));
    this.addLog(entry);
  }

  error(message: string, error?: Error, data?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      data,
      stack: error?.stack,
    };
    console.error(this.formatLog(entry), error);
    this.addLog(entry);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = new Logger();
