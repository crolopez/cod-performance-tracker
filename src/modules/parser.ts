import { UserStats } from '../types/UserStats'
import { APIResponse, APISegment, SegmentType } from '../types/APIResponse'

function getGlobalKd(overviewSegments: APISegment[]): number {
  return overviewSegments[0].stats.kdRatio.value
}

function getKills(overviewSegments: APISegment[]): number {
  return overviewSegments[0].stats.kills.value
}

function getFilteredSegmentsByType({ segments, type }:{ segments: APISegment[], type: string }): APISegment[] {
  return segments.filter(segment => segment.type === type)
}

function getUserStatsFromApiResponse({ platformInfo, segments }: APIResponse): UserStats {
  const overviewSegments = getFilteredSegmentsByType({ segments, type: SegmentType.OVERVIEW })

  return {
    userId: platformInfo.platformUserIdentifier,
    platform: platformInfo.platformSlug,
    globalKd: getGlobalKd(overviewSegments),
    kills: getKills(overviewSegments),
  }
}

export { getUserStatsFromApiResponse }
