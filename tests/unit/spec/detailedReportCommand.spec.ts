import { detailedReportCommand } from '../../../src/modules/commands/detailedReportCommand'
import { getDetailedReport } from '../../../src/modules/trackerController/trackerController'
import { sendMessage } from '../../../src/modules/telegramController'

jest.mock('../../../src/modules/trackerController/trackerController', () => {
  return {
    getDetailedReport: jest.fn().mockReturnValue('report message'),
  }
})

jest.mock('../../../src/modules/telegramController', () => {
  return {
    sendMessage: jest.fn().mockReturnValue('sendMessage: response'),
  }
})

describe('Detailed report command', () => {
  const chatId = 73
  const commandArgs = [ '', '', 'User#1' ]

  test('Handler gets the report', async () => {
    detailedReportCommand.handler(chatId, commandArgs)

    expect(getDetailedReport).toBeCalledWith(commandArgs[2])
  })

  test('Handler sends the report', async () => {
    detailedReportCommand.handler(chatId, commandArgs)

    expect(sendMessage).toBeCalledWith(chatId, 'report message')
  })
})
