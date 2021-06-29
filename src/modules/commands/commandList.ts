import { Command } from '../../types/Command'
import { reportCommand } from './reportCommand'
import { detailedReportCommand } from './detailedReportCommand'
import { versionCommand } from './versionCommand'

export const getCommandList = (): Command[] => ([
  reportCommand,
  detailedReportCommand,
  versionCommand,
])
