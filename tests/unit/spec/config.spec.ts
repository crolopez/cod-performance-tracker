import { getConfig } from '../../../src/utils/config'

describe('Config module', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'TEST:BOT-TOKEN'
    process.env.USER_ALIAS = 'alex:TableKiller#8789,roberto:fisherman#1691'
  })

  test('Config is properly loaded', async () => {
    expect(getConfig().TELEGRAM_BOT_TOKEN).toBe('TEST:BOT-TOKEN')
    expect(getConfig().USER_ALIAS).toEqual({
      alex: 'TableKiller#8789',
      roberto: 'fisherman#1691',
    })
  })

  test('TELEGRAM_BOT_TOKEN is not defined', async () => {
    delete process.env.TELEGRAM_BOT_TOKEN
    let message = ''

    try {
      getConfig()
    } catch (error) {
      message = error.message
    }

    expect(message).toBe('TELEGRAM_BOT_TOKEN is undefined')
  })

  test('USER_ALIAS is not defined', async () => {
    delete process.env.USER_ALIAS

    expect(getConfig().USER_ALIAS).toEqual({})
  })
})
