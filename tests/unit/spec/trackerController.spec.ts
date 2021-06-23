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
  const users = ['user1', 'user2']
  const stats = ['user1\'s stats', 'user2\'s stats']

  test('#getReport (without users)', async () => {
    const result = await getReport([])

    expect(result).toBe(REPORT_HEADER)
  })

  test('#getDetailedReport (without users)', async () => {
    const result = await getDetailedReport([])

    expect(result).toBe(DETAILED_REPORT_HEADER)
  })

  test('#getReport (with several users)', async () => {
    const expectedReport = `${REPORT_HEADER}\n${stats[0]}\n${stats[1]}`
    when(getUserStatsMessage).calledWith(users[0])
      .mockResolvedValue(stats[0])
    when(getUserStatsMessage).calledWith(users[1])
      .mockResolvedValue(stats[1])

    const result = await getReport(users)

    expect(result).toBe(expectedReport)
  })

  test('#getDetailedReport (with several users)', async () => {
    const expectedReport = `${DETAILED_REPORT_HEADER}\n${stats[0]}\n${stats[1]}`
    when(getAllUserStatsMessage).calledWith(users[0])
      .mockResolvedValue(stats[0])
    when(getAllUserStatsMessage).calledWith(users[1])
      .mockResolvedValue(stats[1])

    const result = await getDetailedReport(users)

    expect(result).toBe(expectedReport)
  })

  test('#getReport (with an invalid user)', async () => {
    const expectedReport = `${REPORT_HEADER}\n${stats[0]}\n${stats[1]}`
    when(getUserStatsMessage).calledWith(users[0])
      .mockRejectedValue(stats[0])
    when(getUserStatsMessage).calledWith(users[1])
      .mockRejectedValue(stats[1])

    const result = await getReport(users)

    expect(result).toBe(expectedReport)
  })

  test('#getDetailedReport (with an invalid user)', async () => {
    const expectedReport = `${DETAILED_REPORT_HEADER}\n${stats[0]}\n${stats[1]}`
    when(getAllUserStatsMessage).calledWith(users[0])
      .mockRejectedValue(stats[0])
    when(getAllUserStatsMessage).calledWith(users[1])
      .mockRejectedValue(stats[1])

    const result = await getDetailedReport(users)

    expect(result).toBe(expectedReport)
  })
})
