import { getConfig } from '../../../src/utils/config'

describe('Config module', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'TEST:BOT-TOKEN'
  })

  test('Config is properly loaded', async () => {
    expect(getConfig().TELEGRAM_BOT_TOKEN).toBe('TEST:BOT-TOKEN')
  })

  test('BOT is not defined', async () => {
    delete process.env.TELEGRAM_BOT_TOKEN
    let message = ''

    try {
      getConfig()
    } catch (error) {
      message = error.message
    }

    expect(message).toBe('TELEGRAM_BOT_TOKEN is undefined')
  })
})
