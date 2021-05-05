import { config } from 'dotenv'

config()

export function getConfig(): any {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is undefined')
  }
  if (!process.env.REPORT_EMPTY_DAYS) {
    throw new Error('REPORT_EMPTY_DAYS is undefined')
  }
  if (!process.env.USERS_TO_REPORT) {
    throw new Error('USERS_TO_REPORT is undefined')
  }
  if (!process.env.ENDPOINT_PORT) {
    throw new Error('ENDPOINT_PORT is undefined')
  }
  return {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN as string,
    REPORT_EMPTY_DAYS: process.env.REPORT_EMPTY_DAYS as string,
    USERS_TO_REPORT: (process.env.USERS_TO_REPORT as string).split(','),
    ENDPOINT_PORT: process.env.ENDPOINT_PORT as unknown as number,
  }
}
