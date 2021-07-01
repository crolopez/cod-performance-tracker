import { Command } from '../../types/Command'
import { CommandResponse } from '../../types/CommandResponse'
import { getDetailedReport } from '../trackerController/trackerController'
import { sendMessage } from '../telegramController'
import { reportValidation } from './validations'

const sendReport = async (chatId: number, args: string[]): Promise<CommandResponse> => {
  const user = args[2]
  const report = await getDetailedReport(user)
  const result = await sendMessage(chatId, report)
  return {
    response: result,
    success: true,
  }
}

class DetailedReportCommand implements Command {
  command = 'detailed_report'
  handler = sendReport
  argsValidation = reportValidation
}

const detailedReportCommand = new DetailedReportCommand()
export { detailedReportCommand }
