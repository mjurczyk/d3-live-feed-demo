import { renderTemplate } from '../../utils/renderTemplate';
import { warning } from '../../utils/logger';

export function Renderable({ parent, id, template, model }) {
  let elementDom;
  let renderedTemplate;
  
  if (!parent) {
    warning('No parent specified for a Renderable component.');
    return; 
  }
  
  if (!id) {
    warning('No id specified for a Renderable component. Component may be overriden without notice.');
  }
  
  renderedTemplate = renderTemplate(template, model);
  
  if (elementDom = parent.querySelector(`#${id}`)) {
    elementDom.innerHTML = renderedTemplate;
  } else {
    elementDom = document.createElement('span');
    elementDom.id = id;
    elementDom.innerHTML = renderedTemplate;
    parent.appendChild(elementDom);
  }
  
  return elementDom;
};
