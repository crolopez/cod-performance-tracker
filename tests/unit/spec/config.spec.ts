process.env.TELEGRAM_BOT_TOKEN = 'TEST BOT TOKEN'
process.env.USERS_TO_REPORT = 'user1,user2,user3'

import { getConfig } from '../../../src/utils/config'

describe('Config module', () => {
  test('Config is properly loaded', async () => {

    expect(getConfig().TELEGRAM_BOT_TOKEN).toBe('TEST BOT TOKEN')
    expect(getConfig().USERS_TO_REPORT).toStrictEqual([ 'user1', 'user2', 'user3' ])
  })
})
