import { versionCommand } from '../../../src/modules/commands/versionCommand'
import { sendMessage } from '../../../src/modules/telegramController'

jest.mock('../../../package.json', () => {
  return {
    version: '7.6.5',
  }
})

jest.mock('../../../src/modules/telegramController', () => {
  return {
    sendMessage: jest.fn().mockReturnValue('sendMessage: response'),
  }
})

describe('Version command', () => {
  const chatId = 73

  test('Handler sends the version', async () => {
    const expectedMessage = '*Version:* 7.6.5'

    versionCommand.handler(chatId)

    expect(sendMessage).toBeCalledWith(chatId, expectedMessage)
  })

  test('argsValidation method returns ok', async () => {
    const result = versionCommand.argsValidation()

    expect(result).toBe('ok')
  })
})
