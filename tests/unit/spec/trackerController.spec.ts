import { when } from 'jest-when'
import { getReport, getDetailedReport } from '../../../src/modules/trackerController/trackerController'
import { getUserStatsMessage, getAllUserStatsMessage } from '../../../src/modules/trackerController/userStats'
import { REPORT_HEADER, DETAILED_REPORT_HEADER } from '../data/trackerController.template'

jest.mock('../../../src/modules/trackerController/userStats', () => {
  return {
    getUserStatsMessage: jest.fn(),
    getAllUserStatsMessage: jest.fn(),
  }
})

describe('trackerController module', () => {
  const user = 'user1'
  const stats = 'user1\'s stats'

  test('#getReport (with a valid user)', async () => {
    const expectedReport = `${REPORT_HEADER}\n${stats}`
    when(getUserStatsMessage).calledWith(user)
      .mockResolvedValue(stats)

    const result = await getReport(user)

    expect(result).toBe(expectedReport)
  })

  test('#getDetailedReport (with a valid user)', async () => {
    const expectedReport = `${DETAILED_REPORT_HEADER}\n${stats}`
    when(getAllUserStatsMessage).calledWith(user)
      .mockResolvedValue(stats)

    const result = await getDetailedReport(user)

    expect(result).toBe(expectedReport)
  })
})
