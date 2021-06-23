import type { Message } from 'telegram-typings'
import { commandDispatcher } from '../../../src/modules/commands/commandDispatcher'
import { InvalidBodyRequest, InvalidCommandFormat, CommandNotRecognised }
  from '../../../src/utils/messages'
// import { getCommandList } from '../../../src/modules/commands/commandList'
// import { Command } from '../../../src/types/Command'

jest.mock('../../../src/modules/commands/commandList', () => {
  const handlerResponse = {
    response: 'Fake command response',
    success: true,
  }
  const fakeCommand = {
    command: 'fake_command',
    handler: jest.fn().mockReturnValue(handlerResponse),
  }

  return {
    getCommandList: jest.fn().mockReturnValue([fakeCommand]),
  }
})

describe('Command dispatcher module', () => {
  const chatId = 73
  const message: Message = {
    chat: { id: chatId, type: 'type' },
    text: '',
    message_id: -1,
    date: -1,
  }

  test('Command text is undefined', async () => {
    message.text = undefined

    const result = await commandDispatcher(message)

    expect(result.response).toEqual(InvalidBodyRequest)
    expect(result.success).toEqual(false)
  })

  test('Invalid command', async () => {
    message.text = 'Invalid command'

    const result = await commandDispatcher(message)

    expect(result.response).toEqual(InvalidCommandFormat)
    expect(result.success).toEqual(false)
  })

  test('Unrecognised command', async () => {
    message.text = '/not_a_command'

    const result = await commandDispatcher(message)

    expect(result.response).toEqual(CommandNotRecognised)
    expect(result.success).toEqual(false)
  })

  test('Command handler is called', async () => {
    message.text = '/fake_command'

    const result = await commandDispatcher(message)

    expect(result.response).toEqual('Fake command response')
    expect(result.success).toEqual(true)
  })
})
