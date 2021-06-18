import { config } from 'dotenv'

config()

export function getConfig(): any {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is undefined')
  }
  if (!process.env.USERS_TO_REPORT) {
    throw new Error('USERS_TO_REPORT is undefined')
  }
  return {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN as string,
    USERS_TO_REPORT: (process.env.USERS_TO_REPORT as string).split(','),
  }
}
