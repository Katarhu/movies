


export const getTableData = <T extends object, K extends keyof T>(
  object: T,
  keys: K[]
): [K, string][] => {
  return Object.keys(object)
    .filter((key) => keys.includes(key as K))
    .map((key) => {
      return [key as K, object[key as K] as string]
    })
}
