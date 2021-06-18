import { Command } from '../../types/Command'
import { CommandResponse } from '../../types/CommandResponse'
import { getDetailedReport } from '../trackerController/trackerController'
import { sendMessage } from '../telegramController'
import { getConfig } from '../../utils/config'

const users = getConfig().USERS_TO_REPORT

const sendReport = async (chatId: number): Promise<CommandResponse> => {
  const report = await getDetailedReport(users)
  const result = await sendMessage(chatId, report)
  return {
    response: result,
    success: true,
  }
}

class DetailedReportCommand implements Command {
  command = 'detailed_report'
  handler = sendReport
}

const detailedReportCommand = new DetailedReportCommand()
export { detailedReportCommand }
