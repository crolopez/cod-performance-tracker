import { parseRawUserData } from '../../../src/modules/parser'
import { FIRST_RESPONSE } from '../data/trackerAPIResponse.template'
import { USER_STATS } from '../data/parser.template'
import { UserStats } from '../../../src/types/UserStats'

describe('parser module', () => {

  test('#parseRawUserData', async () => {
    const result: UserStats = parseRawUserData(FIRST_RESPONSE)

    expect(result).toStrictEqual(USER_STATS)
  })
})