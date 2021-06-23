import { getUserStatsMessage, getAllUserStatsMessage } from './userStats'

function getPromiseValue(promise: PromiseSettledResult<string>): string {
  return promise.status === 'fulfilled' ? promise.value : promise.reason
}

async function getDetailedReport(users: string[]): Promise<string> {
  let report = '*///////////////////// DETAILED REPORT /////////////////////*\n'
  const userReports = Array.from(users, user => getAllUserStatsMessage(user))

  await Promise.allSettled(userReports)
    .then(results => results.forEach(result => report += `\n${getPromiseValue(result)}`))

  return report
}

async function getReport(users: string[]): Promise<string> {
  let report = '*///////////////////// REPORT /////////////////////*\n'
  const userReports = Array.from(users, user => getUserStatsMessage(user))

  await Promise.allSettled(userReports)
    .then(results => results.forEach(result => report += `\n${getPromiseValue(result)}`))

  return report
}

export { getDetailedReport, getReport }
