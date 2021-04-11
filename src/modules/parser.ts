import { UserStats } from '../types/UserStats'
import { APIResponse, APISegment, SegmentType } from '../types/APIResponse'

function getFilteredSegmentsByType({ segments, type }:{ segments: APISegment[], type: string }): APISegment[] {
  return segments.filter(segment => segment.type === type)
}

// Filtering functions are used repetitively and may be worth optimising
function getUserStatsFromApiResponse({ platformInfo, segments }: APIResponse): UserStats {
  const filteredSegments = getFilteredSegmentsByType({ segments, type: SegmentType.OVERVIEW })
  return {
    userId: platformInfo.platformUserIdentifier,
    platform: platformInfo.platformSlug,
    globalKd: filteredSegments[0].stats.kdRatio.value,
    kills: filteredSegments[0].stats.kills.value,
  }
}

export { getUserStatsFromApiResponse }
