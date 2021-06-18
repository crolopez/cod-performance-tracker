import { Command } from '../../types/Command'
import { CommandResponse } from '../../types/CommandResponse'
import { getReport } from '../trackerController/trackerController'
import { sendMessage } from '../telegramController'
import { getConfig } from '../../utils/config'

const users = getConfig().USERS_TO_REPORT

const sendReport = async (chatId: number): Promise<CommandResponse> => {
  const report = await getReport(users)
  const result = await sendMessage(chatId, report)
  return {
    response: result,
    success: true,
  }
}

class ReportCommand implements Command {
  command = 'report'
  handler = sendReport
}

const reportCommand = new ReportCommand()
export { reportCommand }
