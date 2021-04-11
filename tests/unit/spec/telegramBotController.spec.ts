import { initBot } from '../../../src/modules/telegramBotController'
// import * as trackerController from '../../../src/modules/trackerController'
import { BOT_HEALTH_CHECK } from '../data/telegramBotController.template'
// import { DETAILED_HTML_REPORT, HTML_REPORT, REPORT_HEADER } from '../data/trackerController.template'
import telebot from '../__mocks__/telebot'

jest.mock('../../../src/modules/config', () => {
  return {
    TELEGRAM_BOT_KEY: 'token',
  }
})

describe('telegramBotController module', () => {
  let botInstanceMock: any
  let onMethod: any
  let sendMessageMethod: any
  const fakeMsg = { from: { id: 'fakeId' } }
  const expectedFormat = { 'parseMode': 'HTML' }

  beforeEach(() => {
    // Clear telebot mock
    telebot.mockClear()
    // Run the function we are testing
    initBot()
    // Get the instance variables
    botInstanceMock = telebot.mock.results[0].value
    onMethod = botInstanceMock.on
    sendMessageMethod = botInstanceMock.sendMessage
  })

  test('Telegram bot is started once', async () => {
    expect(telebot).toHaveBeenCalledTimes(1)
  })

  test('Telegram bot is created with the specified token)', async () => {
    expect(telebot).toHaveBeenCalledWith('token')
  })

  test('Telegram bot starts', async () => {
    expect(botInstanceMock.start).toBeCalledTimes(1)
  })

  test('Telegram bot events are registered', async () => {
    expect(onMethod).toBeCalledTimes(3)
    expect(onMethod.mock.calls[0][0]).toBe('/healthcheck')
    expect(onMethod.mock.calls[1][0]).toBe('/detailed_report')
    expect(onMethod.mock.calls[2][0]).toBe('/report')
  })

  test('Healthcheck event handler returns the module status', async () => {
    const healthCheckHandler = onMethod.mock.calls[0][1]

    healthCheckHandler(fakeMsg)

    expect(sendMessageMethod).toBeCalledWith('fakeId', BOT_HEALTH_CHECK, expectedFormat)
  })

  /*
  test('Detailed report event handler returns the module status', async () => {
    const detailedReportHandler = onMethod.mock.calls[1][1]
    const trackerControllerModule = trackerController as jest.Mocked<typeof trackerController>
    trackerControllerModule.getDetailedReportInHTMLFormat = jest.fn().mockResolvedValue(DETAILED_HTML_REPORT)

    detailedReportHandler(fakeMsg)

    expect(sendMessageMethod).toBeCalledWith('fakeId', DETAILED_HTML_REPORT, expectedFormat)
  })

  test('Report event handler returns the module status', async () => {
    const reportHandler = onMethod.mock.calls[2][1]
    const trackerControllerModule = trackerController as jest.Mocked<typeof trackerController>
    trackerControllerModule.getReportInHTMLFormat = jest.fn().mockResolvedValue(REPORT_HEADER)

    reportHandler(fakeMsg)

    expect(sendMessageMethod).toBeCalledWith('fakeId', HTML_REPORT, expectedFormat)
  })
  */
})