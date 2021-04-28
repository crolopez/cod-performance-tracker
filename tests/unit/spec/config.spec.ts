process.env.TELEGRAM_BOT_KEY = 'TEST BOT KEY'
process.env.REPORT_EMPTY_DAYS = 'false'
process.env.USERS_TO_REPORT = 'user1,user2,user3'

import { getConfig } from '../../../src/modules/config'

describe('Config module', () => {
  test('Config is properly loaded', async () => {

    expect(getConfig().TELEGRAM_BOT_KEY).toBe('TEST BOT KEY')
    expect(getConfig().REPORT_EMPTY_DAYS).toBe('false')
    expect(getConfig().USERS_TO_REPORT).toStrictEqual([ 'user1', 'user2', 'user3' ])
  })
})
