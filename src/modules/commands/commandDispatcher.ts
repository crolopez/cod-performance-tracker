import type { Message } from 'telegram-typings'
import { getCommandList } from './commandList'
import { sendMessage } from '../telegramController'
import { CommandResponse } from '../../types/CommandResponse'
import { InvalidBodyRequest, InvalidCommandFormat,
  CommandNotRecognised } from '../../utils/messages'

const commandRegex = '^/([^ ]+)[ ]*([^ ]*)[ ]*([^ ]*)'

function getCommandError(message: string): CommandResponse {
  return {
    response: message,
    success: false,
  }
}

export async function commandDispatcher(message: Message): Promise<CommandResponse> {
  const {
    chat,
    text,
  } = message

  if (text === undefined) {
    return getCommandError(InvalidBodyRequest)
  }

  const commandParsed = text.match(commandRegex)
  if (commandParsed == null) {
    return getCommandError(InvalidCommandFormat)
  }

  const commandHandler = getCommandList().filter(x => x.command == commandParsed[1])[0]
  if (commandHandler === undefined) {
    return getCommandError(CommandNotRecognised)
  }

  const validation = commandHandler.argsValidation(commandParsed)
  if (validation !== 'ok') {
    sendMessage(chat.id, `*${InvalidCommandFormat}:* \`${validation}\``)
    return getCommandError(`${InvalidCommandFormat}: ${validation}`)
  }

  console.log(`Executing '${text}' from ${chat.id}`)
  return commandHandler.handler(chat.id, commandParsed)
}
