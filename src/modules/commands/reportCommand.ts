import { Command } from '../../types/Command'
import { CommandResponse } from '../../types/CommandResponse'
import { getReport } from '../trackerController/trackerController'
import { sendMessage } from '../telegramController'
import { reportValidation } from './validations'

const sendReport = async (chatId: number, args: string[]): Promise<CommandResponse> => {
  const user = args[2]
  const report = await getReport(user)
  const result = await sendMessage(chatId, report)
  return {
    response: result,
    success: true,
  }
}

class ReportCommand implements Command {
  command = 'report'
  handler = sendReport
  argsValidation = reportValidation
}

const reportCommand = new ReportCommand()
export { reportCommand }
