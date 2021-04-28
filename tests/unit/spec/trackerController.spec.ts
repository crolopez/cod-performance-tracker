import nock from 'nock'
import { getDetailedReportInHTMLFormat, getReportInHTMLFormat } from '../../../src/modules/trackerController'
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

  test('#getDetailedReportInHTMLFormat (without users)', async () => {
    const result = await getDetailedReportInHTMLFormat([])

    expect(result).toBe(DETAILED_REPORT_HEADER)
  })

  test('#getReportInHTMLFormat (without users)', async () => {
    const result = await getReportInHTMLFormat([])

    expect(result).toBe(REPORT_HEADER)
  })

  test('#getDetailedReportInHTMLFormat (with several users)', async () => {
    mockTrackerAPI(testUsers[0], getFirstUserResponse())
    mockTrackerAPI(testUsers[1], getSecondUserResponse())

    const result = await getDetailedReportInHTMLFormat(testUsers)

    expect(result).toBe(DETAILED_HTML_REPORT)
  })

  test('#getReportInHTMLFormat (with several users)', async () => {
    mockTrackerAPI(testUsers[0], getFirstUserResponse())
    mockTrackerAPI(testUsers[1], getSecondUserResponse())

    const result = await getReportInHTMLFormat(testUsers)

    expect(result).toBe(HTML_REPORT)
  })

  test('#getDetailedReportInHTMLFormat (with an invalid user)', async () => {
    mockTrackerAPIWithError(testUsers[0])

    const result = await getDetailedReportInHTMLFormat([testUsers[0]])

    expect(result).toBe(DETAILED_ERROR_HTML_REPORT)
  })

  test('#getReportInHTMLFormat (with an invalid user)', async () => {
    mockTrackerAPIWithError(testUsers[0])

    const result = await getReportInHTMLFormat([testUsers[0]])

    expect(result).toBe(ERROR_HTML_REPORT)
  })
})
