export interface APISegment {
  type: string
  stats: {
    kills: { value: number }
    kdRatio: { value: number }
  }
}

export enum SegmentType {
  OVERVIEW = 'overview'
}

export interface APIResponse {
  platformInfo: {
    platformUserIdentifier: string
    platformSlug: string
  }
  segments: APISegment[]
}
