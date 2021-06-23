import { getConfig } from '../../../src/utils/config'

describe('Config module', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'TEST:BOT-TOKEN'
    process.env.USERS_TO_REPORT = 'user1,user2,user3'
  })

  test('Config is properly loaded', async () => {
    expect(getConfig().TELEGRAM_BOT_TOKEN).toBe('TEST:BOT-TOKEN')
    expect(getConfig().USERS_TO_REPORT).toStrictEqual([ 'user1', 'user2', 'user3' ])
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

  test('USERS_TO_REPORT is not defined', async () => {
    delete process.env.USERS_TO_REPORT
    let message = ''

    try {
      getConfig()
    } catch (error) {
      message = error.message
    }

    expect(message).toBe('USERS_TO_REPORT is undefined')
  })
})
