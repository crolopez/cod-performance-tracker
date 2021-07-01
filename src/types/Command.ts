import { CommandResponse } from './CommandResponse'

export interface Command {
  command: string
  argsValidation: (args: string[]) => string
  handler: (chatId: number, args?: string[]) => Promise<CommandResponse>
}
