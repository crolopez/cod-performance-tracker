import axios from 'axios'
import { getUserStatsFromApiResponse } from './parser'
import { UserStats } from '../../types/UserStats'
import { APIResponse } from '../../types/APIResponse'

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

async function getUserStatsMessage(user: string): Promise<string> {
  try {
    const userStats = await getUserStats(user)
    return getHTMLFormatMessageFromUserStats(userStats, false)
  } catch (err) {
    console.log(`Error: ${err}`)
    return `Could not get the information for ${user}`
  }
}

async function getAllUserStatsMessage(user: string): Promise<string> {
  try {
    const userStats = await getUserStats(user)
    return getHTMLFormatMessageFromUserStats(userStats, true)
  } catch (err) {
    console.log(`Error: ${err}`)
    return `Could not get the information for ${user}`
  }
}

export { getUserStatsMessage, getAllUserStatsMessage }
