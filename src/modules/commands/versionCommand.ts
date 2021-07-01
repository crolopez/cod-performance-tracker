import { Command } from '../../types/Command'
import { CommandResponse } from '../../types/CommandResponse'
import { sendMessage } from '../telegramController'
import { version } from '../../../package.json'

const sendVersion = async (chatId: number): Promise<CommandResponse> => {
  const packageVersion = `*Version:* ${version}`
  const result = await sendMessage(chatId, packageVersion)
  return {
    response: result,
    success: true,
  }
}

class VersionCommand implements Command {
  command = 'version'
  handler = sendVersion
  argsValidation = () => { return 'ok' }
}

const versionCommand = new VersionCommand()
export { versionCommand }
