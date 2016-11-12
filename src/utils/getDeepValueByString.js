/**
 * Access deep parameter of an object using a string.
 * If the value is not defined, return null.
 * 
 * @param   {object}   object
 * @param   {string}   key    dot-separated shallow or deep parameter
 * @returns {any|null} parameter value or null if not defined
 */
export function getDeepValueByString(object = {}, key = '') {
  return key.split(/\./g).reduce((value, subkey) => {
    if (value === null) {
      return null;
    } else {
      return value[subkey] || null;
    }
  }, object);
};
