export const getFirstUserResponse = (): any => ({
  data: {
    platformInfo: {
      platformSlug: 'battlenet',
      platformUserIdentifier: 'fisherman#1691',
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
  },
})
