export default jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  on: jest.fn(),
  sendMessage: jest.fn(),
}))
