import { getUserStatsFromApiResponse } from '../../../src/modules/parser'
import { getFirstUserResponse } from '../data/trackerAPIResponse.template'
import { USER_STATS } from '../data/parser.template'
import { UserStats } from '../../../src/types/UserStats'

describe('parser module', () => {

  test('#parseRawUserData', async () => {
    const result: UserStats = getUserStatsFromApiResponse(getFirstUserResponse().data)

    expect(result).toStrictEqual(USER_STATS)
  })
})