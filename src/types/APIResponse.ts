export interface APISegment {
  type: string,
  stats: {
    kills: { value: number },
    kdRatio: { value: number },
  }
}

export interface APIResponse {
  data: {
    platformInfo: {
      platformUserIdentifier: string,
      platformSlug: string,
    },
    segments: APISegment[],
  }
}
