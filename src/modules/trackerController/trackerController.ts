import { getUserStatsMessage, getAllUserStatsMessage } from './userStats'

async function getDetailedReport(user: string): Promise<string> {
  const header = '*///////////////////// DETAILED REPORT /////////////////////*\n'
  const report = await getAllUserStatsMessage(user)

  return `${header}\n${report}`
}

async function getReport(user: string): Promise<string> {
  const header = '*///////////////////// REPORT /////////////////////*\n'
  const report = await getUserStatsMessage(user)

  return `${header}\n${report}`
}

export { getDetailedReport, getReport }
