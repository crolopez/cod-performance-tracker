import { CommandHandler } from 'src/types/CommandHandler'
import { reportCommand } from './reportCommand'
import { detailedReportCommand } from './detailedReportCommand'

export const getCommandsHandlers = (): CommandHandler[] => ([
  reportCommand,
  detailedReportCommand,
])
