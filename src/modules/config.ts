/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { config } from 'dotenv'

config()

export function getConfig () {
  if (!process.env.TELEGRAM_BOT_KEY) {
    throw new Error('TELEGRAM_BOT_KEY is undefined')
  }
  if (!process.env.REPORT_EMPTY_DAYS) {
    throw new Error('REPORT_EMPTY_DAYS is undefined')
  }
  if (!process.env.USERS_TO_REPORT) {
    throw new Error('USERS_TO_REPORT is undefined')
  }
  return {
    TELEGRAM_BOT_KEY: process.env.TELEGRAM_BOT_KEY as string,
    REPORT_EMPTY_DAYS: process.env.REPORT_EMPTY_DAYS as string,
    USERS_TO_REPORT: (process.env.USERS_TO_REPORT as string).split(','),
  }
}
