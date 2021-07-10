import nock from 'nock'
import { getUserStatsMessage, getAllUserStatsMessage } from '../../../src/modules/trackerController/userStats'
import { HTML_STATS, DETAILED_HTML_STATS,
  ERROR_HTML_STATS, DETAILED_ERROR_HTML_STATS } from '../data/userStats.template'
import { getFirstUserResponse } from '../data/trackerAPIResponse.template'

function mockTrackerAPI(user: string, response: any) {
  nock('https://api.tracker.gg/api/v2/cold-war/standard/profile/battlenet')
    .get(`/${user.replace('#', '%23')}`)
    .reply(200, response)
}

function mockTrackerAPIWithError(user: string) {
  nock('https://api.tracker.gg/api/v2/cold-war/standard/profile/battlenet')
    .get(`/${user.replace('#', '%23')}`)
    .replyWithError(':(')
}

describe('userStats module', () => {
  const testUser = 'fisherman#1691'

  beforeEach(() => {
    nock.disableNetConnect()
    process.env.TELEGRAM_BOT_TOKEN = 'TEST:BOT-TOKEN'
    delete process.env.USER_ALIAS
  })

  test('#getUserStatsMessage (with a valid user)', async () => {
    mockTrackerAPI(testUser, getFirstUserResponse())

    const result = await getUserStatsMessage(testUser)

    expect(result).toBe(HTML_STATS)
  })

  test('#getAllUserStatsMessage (with a valid user)', async () => {
    mockTrackerAPI(testUser, getFirstUserResponse())

    const result = await getAllUserStatsMessage(testUser)

    expect(result).toBe(DETAILED_HTML_STATS)
  })

  test('#getUserStatsMessage (with an invalid user)', async () => {
    mockTrackerAPIWithError(testUser)

    const result = await getUserStatsMessage(testUser)

    expect(result).toBe(ERROR_HTML_STATS)
  })

  test('#getAllUserStatsMessage (with an invalid user)', async () => {
    mockTrackerAPIWithError(testUser)

    const result = await getAllUserStatsMessage(testUser)

    expect(result).toBe(DETAILED_ERROR_HTML_STATS)
  })

  test('#getUserStatsMessage (with an alias)', async () => {
    mockTrackerAPI(testUser, getFirstUserResponse())
    process.env.USER_ALIAS = 'roberto:fisherman#1691'

    const result = await getUserStatsMessage('roberto')

    expect(result).toBe(HTML_STATS)
  })

  test('#getAllUserStatsMessage (with an alias)', async () => {
    mockTrackerAPI(testUser, getFirstUserResponse())
    process.env.USER_ALIAS = 'roberto:fisherman#1691'

    const result = await getAllUserStatsMessage('roberto')

    expect(result).toBe(DETAILED_HTML_STATS)
  })
})
