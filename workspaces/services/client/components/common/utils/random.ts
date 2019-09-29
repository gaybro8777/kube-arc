export const randomId = (): string =>
  Math.random()
    .toString(36)
    .substring(2, 8) +
  Math.random()
    .toString(36)
    .substring(2, 8)
