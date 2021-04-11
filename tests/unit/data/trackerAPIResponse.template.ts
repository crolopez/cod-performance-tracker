/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getZelopecResponse = () => ({
  platformInfo: {
    platformSlug: 'battlenet',
    platformUserIdentifier: 'Zelopec#2548',
  },
  segments: [
    {
      type: 'overview',
      stats: {
        kills: {
          displayName: 'Kills',
          value: 9906,
        },
        kdRatio: {
          displayName: 'K/D Ratio',
          value: 2.11,
        },
      },
    },
  ],
})

export const getSneezyDwarfResponse = () => ({
  platformInfo: {
    platformSlug: 'battlenet',
    platformUserIdentifier: 'SneezyDwarf#2155284',
  },
  segments: [
    {
      type: 'overview',
      stats: {
        kills: {
          displayName: 'Kills',
          value: 7636,
        },
        kdRatio: {
          displayName: 'K/D Ratio',
          value: 0.58,
        },
      },
    },
  ],
})
