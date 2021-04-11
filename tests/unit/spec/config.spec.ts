process.env.TELEGRAM_BOT_KEY = 'TEST BOT KEY'
process.env.REPORT_EMPTY_DAYS = 'false'
process.env.USERS_TO_REPORT = 'user1,user2,user3'

import CONFIG from '../../../src/modules/config'

describe('Config module', () => {
  test('Config is properly loaded', async () => {

    expect(CONFIG.TELEGRAM_BOT_KEY).toBe('TEST BOT KEY')
    expect(CONFIG.REPORT_EMPTY_DAYS).toBe('false')
    expect(CONFIG.USERS_TO_REPORT).toStrictEqual([ 'user1', 'user2', 'user3' ])
  })
})
