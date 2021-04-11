import { config } from 'dotenv'

config()

const CONFIG = {
  TELEGRAM_BOT_KEY: process.env.TELEGRAM_BOT_KEY as string,
  REPORT_EMPTY_DAYS: process.env.REPORT_EMPTY_DAYS as string,
  USERS_TO_REPORT: (process.env.USERS_TO_REPORT as string).split(','),
}

export default CONFIG
