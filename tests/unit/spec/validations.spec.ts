import { reportValidation } from '../../../src/modules/commands/validations'

describe('Command validation module', () => {
  test('Report validation fails', async () => {
    const args = [ '', 'command', '' ]

    const result = reportValidation(args)

    expect(result).toBe('/command <user>')
  })

  test('Report validation pass', async () => {
    const args = [ '', 'command', 'user' ]

    const result = reportValidation(args)

    expect(result).toBe('ok')
  })
})
