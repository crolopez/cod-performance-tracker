import axios from 'axios'
import { sendMessage } from '../../../src/modules/telegramController'

jest.mock('axios', () => {
  return {
    post: jest.fn().mockReturnValue({
      data: 'Axios response',
    }),
  }
})

jest.mock('../../../src/utils/config', () => {
  return {
    getConfig: jest.fn().mockReturnValue({
      TELEGRAM_BOT_TOKEN: 'TEST:BOT-TOKEN',
    }),
  }
})

describe('telegramController module', () => {
  test('#sendMessage', async () => {
    const chatId = 73
    const message = 'anything'
    const expectedWebhook = 'https://api.telegram.org/botTEST:BOT-TOKEN/sendMessage'
    const expectedParameters = {
      'chat_id': chatId,
      'parse_mode': 'markdown',
      'text': message,
    }

    sendMessage(chatId, message)

    expect(axios.post).toBeCalledWith(expectedWebhook, expectedParameters)
  })
})
