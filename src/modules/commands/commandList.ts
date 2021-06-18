import { Command } from '../../types/Command'
import { reportCommand } from './reportCommand'
import { detailedReportCommand } from './detailedReportCommand'

export const getCommandList = (): Command[] => ([
  reportCommand,
  detailedReportCommand,
])
