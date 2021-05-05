import { getCommandsHandlers } from './commands/commands'
import { CommandResponse } from 'src/types/CommandResponse'
import { RequestBody } from 'src/types/RequestBody'
import { InvalidBodyRequest, InvalidCommandFormat, CommandNotRecognised } from '../helpers/messages'

const commandRegex = '/([^ ]+)[ ]*([^ ]*)[ ]*([^ ]*)'


function getCommandError(message: string): CommandResponse {
  return {
    response: message,
    success: false,
  }
}

export async function commandDispatcher(request: RequestBody): Promise<CommandResponse> {
  const command = request.message.text
  const chatId = request.message.chat.id

  if (command === undefined) {
    return getCommandError(InvalidBodyRequest)
  }

  const commandParsed = command.match(commandRegex)
  if (commandParsed == null) {
    return getCommandError(InvalidCommandFormat)
  }

  const commandHandler = getCommandsHandlers().filter(x => x.command == commandParsed[1])[0]
  if (commandHandler === undefined) {
    return getCommandError(CommandNotRecognised)
  }

  return commandHandler.handler(chatId, commandParsed)
}
