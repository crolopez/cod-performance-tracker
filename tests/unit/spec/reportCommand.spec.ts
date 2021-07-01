import { reportCommand } from '../../../src/modules/commands/reportCommand'
import { getReport } from '../../../src/modules/trackerController/trackerController'
import { sendMessage } from '../../../src/modules/telegramController'

jest.mock('../../../src/modules/trackerController/trackerController', () => {
  return {
    getReport: jest.fn().mockReturnValue('report message'),
  }
})

jest.mock('../../../src/modules/telegramController', () => {
  return {
    sendMessage: jest.fn().mockReturnValue('sendMessage: response'),
  }
})

describe('Report command', () => {
  const chatId = 73
  const commandArgs = [ '', '', 'User#1' ]

  test('Handler gets the report', async () => {
    reportCommand.handler(chatId, commandArgs)

    expect(getReport).toBeCalledWith(commandArgs[2])
  })

  test('Handler sends the report', async () => {
    reportCommand.handler(chatId, commandArgs)

    expect(sendMessage).toBeCalledWith(chatId, 'report message')
  })
})
