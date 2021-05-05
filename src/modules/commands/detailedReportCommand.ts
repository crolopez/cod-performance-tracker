import { CommandHandler } from 'src/types/CommandHandler'
import { CommandResponse } from 'src/types/CommandResponse'
import { getDetailedReport } from '../trackerController'
import { sendMessage } from '../telegramBotController'
import { getConfig } from '../config'

const users = getConfig().USERS_TO_REPORT

const sendReport = async (chatId: string): Promise<CommandResponse> => {
  const report = await getDetailedReport(users)
  const result = await sendMessage(chatId, report)
  return {
    response: result,
    success: true,
  }
}

class DetailedReportCommand implements CommandHandler {
  command = 'detailed_report'
  handler = sendReport
}

const detailedReportCommand = new DetailedReportCommand()
export { detailedReportCommand }
