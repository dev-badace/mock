/**
 *
 * @param partialObj Object 1 that has less properties
 * @param objectToMatch Object 2 that has equal or more proerties
 * @param config Keycount expects the keyCount of partialObj param and Deep Check of the object
 * @returns
 */

export const matchPartial = (
  partialObj: any,
  objectToMatch: any,
  config?: { keyCount?: number; deep?: boolean; exclude?: string[] }
): boolean => {
  const partialKeyCount = Object.keys(partialObj).length;
  if (config?.keyCount && partialKeyCount !== config?.keyCount)
    throw new Error(`Object does not have required key count
        required : ${config?.keyCount}
        recieved: ${partialKeyCount}
        `);

  try {
    for (let key in partialObj) {
      //Excludes certain properties to not be matched
      if (config?.exclude?.indexOf(key) !== -1) continue;

      //Executes a deep match for nested objects
      if (config?.deep && typeof partialObj[key] === "object") {
        const deepMatch = matchPartial(partialObj[key], objectToMatch[key], {
          deep: true,
        });
        if (!deepMatch) return false;

        continue;
      }

      //Date Check --- Date are ignored due to inconsistent timings
      if (
        !isNaN(Date.parse(partialObj[key])) &&
        !isNaN(Date.parse(objectToMatch[key]))
      )
        continue;

      if (objectToMatch[key] != partialObj[key]) {
        return false;
      }
    }
  } catch (e) {
    console.error(e.message);
    return false;
  }

  return true;
};
