function getAliasDictionary(rawAliases: string): {[key: string]: string} {
  const aliases = rawAliases != undefined ? rawAliases.split(',') : []
  const node: {[key: string]: string} = {}
  aliases.forEach(x => {
    const row = x.split(':')
    node[row[0]] = row[1]
  })

  return node
}

export function getConfig(): any {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is undefined')
  }
  return {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN as string,
    USER_ALIAS: getAliasDictionary(process.env.USER_ALIAS as string),
  }
}
