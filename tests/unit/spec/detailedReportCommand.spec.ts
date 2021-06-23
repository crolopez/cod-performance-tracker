import { detailedReportCommand } from '../../../src/modules/commands/detailedReportCommand'
import { getDetailedReport } from '../../../src/modules/trackerController/trackerController'
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

  test('Handler gets the report', async () => {
    detailedReportCommand.handler(chatId)

    expect(getDetailedReport).toBeCalledWith('user1,user2,user3')
  })

  test('Handler sends the report', async () => {
    detailedReportCommand.handler(chatId)

    expect(sendMessage).toBeCalledWith(chatId, 'report message')
  })
})
