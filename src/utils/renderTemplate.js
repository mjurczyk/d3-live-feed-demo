import { getDeepValueByString } from './getDeepValueByString';

/**
 * Render a string template.
 * Replace curly-parenthese enclosed values with corresponding
 * values from a passed object.
 * 
 * @see     http://mustache.github.io
 * @param   {string}   template
 * @param   {object}   values   values put into the template
 * @returns {string}   parsed template
 */
export function renderTemplate(template = '', values = {}) {
  return template.replace(/{([^}]+)}/gm, (match, key) => {
    return getDeepValueByString(values, key) || '';
  });
};