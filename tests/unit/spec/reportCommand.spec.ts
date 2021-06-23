import { reportCommand } from '../../../src/modules/commands/reportCommand'
import { getReport } from '../../../src/modules/trackerController/trackerController'
import { sendMessage } from '../../../src/modules/telegramController'

jest.mock('../../../src/utils/config', () => {
  return {
    getConfig: jest.fn().mockReturnValue({
      USERS_TO_REPORT: 'user1,user2,user3',
    }),
  }
})

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

  test('Handler gets the report', async () => {
    reportCommand.handler(chatId)

    expect(getReport).toBeCalledWith('user1,user2,user3')
  })

  test('Handler sends the report', async () => {
    reportCommand.handler(chatId)

    expect(sendMessage).toBeCalledWith(chatId, 'report message')
  })
})
