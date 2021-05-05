import { CommandResponse } from './CommandResponse'

export interface CommandHandler {
  command: string
  handler: (chatId: string, args?: string[]) => Promise<CommandResponse>
}
