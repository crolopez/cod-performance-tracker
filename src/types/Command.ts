import { CommandResponse } from './CommandResponse'

export interface Command {
  command: string
  handler: (chatId: number, args?: string[]) => Promise<CommandResponse>
}
