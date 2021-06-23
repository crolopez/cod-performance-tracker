import { getCommandList } from '../../../src/modules/commands/commandList'
import { reportCommand } from '../../../src/modules/commands/reportCommand'
import { detailedReportCommand } from '../../../src/modules/commands/detailedReportCommand'

jest.mock('../../../src/utils/config', () => {
  return {
    getConfig: jest.fn().mockReturnValue({
      TELEGRAM_BOT_TOKEN: 'TEST:BOT-TOKEN',
    }),
  }
})

describe('Command list', () => {
  test('#getCommandList', async () => {
    const list = getCommandList()

    expect(list).toContain(reportCommand)
    expect(list).toContain(detailedReportCommand)
  })
})
