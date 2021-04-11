import { getUserStatsFromApiResponse } from '../../../src/modules/parser'
import { getZelopecResponse } from '../data/trackerAPIResponse.template'
import { USER_STATS } from '../data/parser.template'

describe('parser module', () => {
  it('should parse the stats from the api response', () => {
    const result = getUserStatsFromApiResponse(getZelopecResponse())

    expect(result).toStrictEqual(USER_STATS)
  })
})