import { UserStats } from 'src/types/UserStats'
import { APIResponse, APISegment } from 'src/types/APIResponse'

const overviewType = 'overview'

function getSegmentsByType(rawUserData: APIResponse, type: string): APISegment[] {
  return rawUserData.data.segments.filter(x => x.type == type)
}

function getGlobalKd(rawUserData: APIResponse): number {
  return getSegmentsByType(rawUserData, overviewType)[0].stats.kdRatio.value
}

function getKills(rawUserData: APIResponse): number {
  return getSegmentsByType(rawUserData, overviewType)[0].stats.kills.value
}

// Filtering functions are used repetitively and may be worth optimising
function parseRawUserData(rawUserData: APIResponse): UserStats {
  return {
    userId: rawUserData.data.platformInfo.platformUserIdentifier,
    platform: rawUserData.data.platformInfo.platformSlug,
    globalKd: getGlobalKd(rawUserData),
    kills: getKills(rawUserData),
  }
}

export { parseRawUserData }
