import axios from 'axios'
import { getUserStatsFromApiResponse } from './parser'
import { UserStats } from 'src/types/UserStats'
import { APIResponse } from 'src/types/APIResponse'

const trackerAPI = 'https://api.tracker.gg/api/v2/cold-war/standard/profile/battlenet/'
const requestHeaders = {
  headers: {
    'User-Agent': 'cod-performance-tracker',
    'Accept': 'application/json',
    'Accept-Encoding': 'identity',
    'Connection': 'Keep-Alive',
  },
}

async function requestUserData(user: string): Promise<APIResponse> {
  const userUrl = `${trackerAPI}${user}`.replace('#', '%23')

  const { data } = await axios.get(userUrl, requestHeaders)

  return data.data
}

async function getUserStats(user: string): Promise<UserStats> {
  const rawUserData = await requestUserData(user)
  return getUserStatsFromApiResponse(rawUserData)
}

function getHTMLFormatMessageFromUserStats(userStats: UserStats, all: boolean): string {
  let message = `*User: *${userStats.userId}\n`
  if (all) message += `*Platform: *${userStats.platform}\n`
  message += `*Global KD: *${userStats.globalKd}\n`
  if (all) message += `*Kills: *${userStats.kills}\n`

  return message
}

async function getUserStatsMessage(user: string, all: boolean): Promise<string> {
  try {
    const userStats = await getUserStats(user)
    return getHTMLFormatMessageFromUserStats(userStats, all)
  } catch (err) {
    console.log(`Error: ${err}`)
    return `Could not get the information for ${user}`
  }
}

function getPromiseValue(promise: PromiseSettledResult<string>): string {
  return promise.status === 'fulfilled' ? promise.value : promise.reason
}

async function getDetailedReport(users: string[]): Promise<string> {
  let report = '*///////////////////// DETAILED REPORT /////////////////////*\n'
  const userReports = Array.from(users, user => getUserStatsMessage(user, true))

  await Promise.allSettled(userReports)
    .then(results => results.forEach(result => report += `\n${getPromiseValue(result)}`))

  return report
}

async function getReport(users: string[]): Promise<string> {
  let report = '*///////////////////// REPORT /////////////////////*\n'
  const userReports = Array.from(users, user => getUserStatsMessage(user, false))

  await Promise.allSettled(userReports)
    .then(results => results.forEach(result => report += `\n${getPromiseValue(result)}`))

  return report
}

export { getDetailedReport, getReport }
