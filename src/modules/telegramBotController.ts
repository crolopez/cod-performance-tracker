import TeleBot from 'telebot'
import { getConfig } from './config'
import { getDetailedReportInHTMLFormat, getReportInHTMLFormat } from './trackerController'

let bot: TeleBot

function send(id: string, msg: string): void {
  bot.sendMessage(id, msg, { parseMode: 'HTML' })
}

function registerBotEvents(): void {
  // TODO
  bot.on('/healthcheck', (msg: any) => {
    return bot.sendMessage(msg.from.id,
      '<b>//////// BOT HEALTH CHECK ////////</b>\n\n' +
      '<b>Analysed soldiers:</b> X\n' +
      '<b>Last report:</b> Y\n',
      { parseMode: 'HTML' })
  })

  bot.on('/detailed_report', async (msg: any) => {
    const report: string = await getDetailedReportInHTMLFormat(getConfig().USERS_TO_REPORT)
    send(msg.from.id, report)
  })

  bot.on('/report', async (msg: any) => {
    const report: string = await getReportInHTMLFormat(getConfig().USERS_TO_REPORT)
    send(msg.from.id, report)
  })
}

function initBot(): void {
  bot = new TeleBot(getConfig().TELEGRAM_BOT_KEY)
  registerBotEvents()
  bot.start()
}

export { initBot }
