import nock from 'nock'
import { getDetailedReport, getReport } from '../../../src/modules/trackerController/trackerController'
import { REPORT_HEADER, DETAILED_REPORT_HEADER, HTML_REPORT, DETAILED_HTML_REPORT,
  ERROR_HTML_REPORT, DETAILED_ERROR_HTML_REPORT } from '../data/trackerController.template'
import { getFirstUserResponse , getSecondUserResponse } from '../data/trackerAPIResponse.template'

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

describe('trackerController module', () => {
  const testUsers = ['Zelopec#2548', 'SneezyDwarf#2155284']

  beforeEach(() => {
    nock.disableNetConnect()
  })

  test('#getDetailedReport (without users)', async () => {
    const result = await getDetailedReport([])

    expect(result).toBe(DETAILED_REPORT_HEADER)
  })

  test('#getReport (without users)', async () => {
    const result = await getReport([])

    expect(result).toBe(REPORT_HEADER)
  })

  test('#getDetailedReport (with several users)', async () => {
    mockTrackerAPI(testUsers[0], getFirstUserResponse())
    mockTrackerAPI(testUsers[1], getSecondUserResponse())

    const result = await getDetailedReport(testUsers)

    expect(result).toBe(DETAILED_HTML_REPORT)
  })

  test('#getReport (with several users)', async () => {
    mockTrackerAPI(testUsers[0], getFirstUserResponse())
    mockTrackerAPI(testUsers[1], getSecondUserResponse())

    const result = await getReport(testUsers)

    expect(result).toBe(HTML_REPORT)
  })

  test('#getDetailedReport (with an invalid user)', async () => {
    mockTrackerAPIWithError(testUsers[0])

    const result = await getDetailedReport([testUsers[0]])

    expect(result).toBe(DETAILED_ERROR_HTML_REPORT)
  })

  test('#getReport (with an invalid user)', async () => {
    mockTrackerAPIWithError(testUsers[0])

    const result = await getReport([testUsers[0]])

    expect(result).toBe(ERROR_HTML_REPORT)
  })
})
