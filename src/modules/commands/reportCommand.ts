import { CommandHandler } from 'src/types/CommandHandler'
import { CommandResponse } from 'src/types/CommandResponse'
import { getReport } from '../trackerController'
import { sendMessage } from '../telegramBotController'
import { getConfig } from '../config'

const users = getConfig().USERS_TO_REPORT

const sendReport = async (chatId: string): Promise<CommandResponse> => {
  const report = await getReport(users)
  const result = await sendMessage(chatId, report)
  return {
    response: result,
    success: true,
  }
}

class ReportCommand implements CommandHandler {
  command = 'report'
  handler = sendReport
}

const reportCommand = new ReportCommand()
export { reportCommand }
