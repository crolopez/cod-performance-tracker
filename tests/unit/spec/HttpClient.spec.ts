import nock from 'nock'
import HttpClient from '../../../src/modules/HttpClient/HttpClient'

describe('Class HttpClient', () => {
  beforeEach(() => {
    nock.disableNetConnect()
  })

  test('#get', async () => {
    const url = 'https://fake.com'
    const expectedResponse = 'fakeStringResponse'

    nock(url)
      .get('/')
      .reply(200, expectedResponse)

    const result = await HttpClient.get<string>({
      url,
      headers: {},
    })

    expect(result).toBe(expectedResponse)
  })

  test('#put', async () => {
    const url = 'https://fake.com'
    const expectedResponse = 'fakeStringResponse'

    nock(url)
      .put('/')
      .reply(200, expectedResponse)

    const result = await HttpClient.put<string>({
      url,
      headers: {},
    })

    expect(result).toBe(expectedResponse)
  })

  test('#buildHeaders (with token)', () => {
    const RequestVerificationToken = 'fooToken'
    const headersToken = { headers: {RequestVerificationToken } }

    expect(HttpClient.buildHeaders(RequestVerificationToken)).toEqual(headersToken)
  })

  test('#buildHeaders (without token)', () => {
    const headersNoToken = { headers: {} }

    expect(HttpClient.buildHeaders(undefined)).toEqual(headersNoToken)
  })
})