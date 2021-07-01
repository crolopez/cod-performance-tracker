function reportValidation(args: string[]): string {
  if (args[2] === '') {
    return `/${args[1]} <user>`
  }
  return 'ok'
}

export { reportValidation }