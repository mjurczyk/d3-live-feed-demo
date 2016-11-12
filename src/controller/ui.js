import { Manager } from 'hammerjs';

const appBody = document.querySelector('.app');
const gaugesListElement = document.querySelector('.gauges-list');
const gaugesIndicatorsListElement = document.querySelector('.gauges-list-indicators');

const pivotMarginDeviation = 25;
const pivotMarginThreshold = 50;
const pivotMarginStep = 380;

const mobileAppClassName = 'app-mobile';
const activeIndicatorClassName = 'active';

const swipeController = new Manager(appBody);
swipeController.add(new Hammer.Pan());

/**
 * Enable mobile view.
 * Enable touch controls.
 * Compress the view.
 */
export function showMobileUI() {
  const gaugesElements = Array.prototype.slice.call(document.querySelectorAll('.gauge'));
  const gaugesCount = Array.prototype.slice.call(gaugesElements).length - 1;
  let pivotMargin = 0;
  
  appBody.className += ` ${mobileAppClassName}`;
  
  gaugesElements.forEach((element, index) => {
    const indicator = document.createElement('div');
    
    if (index === 0){
      indicator.className = activeIndicatorClassName;  
    }
    
    gaugesIndicatorsListElement.appendChild(indicator);
  });
  
  swipeController.on('pan', ({ deltaX }) => {
    const deltaMargin = deltaX < 0 ? -pivotMarginDeviation : pivotMarginDeviation;

    gaugesListElement.style.marginLeft = pivotMargin + deltaMargin;
  });
  
  
  swipeController.on('panend', ({ deltaX }) => {
    let deltaPivot = 0;
    let indicatorIndex = 0;
    
    if (deltaX <= -pivotMarginThreshold) {
      deltaPivot = -pivotMarginStep; 
    }
    if (deltaX >= pivotMarginThreshold) {
      deltaPivot = pivotMarginStep; 
    }
    
    if (pivotMargin + deltaPivot <= 0 && pivotMargin + deltaPivot >= -gaugesCount * pivotMarginStep) {
      pivotMargin += deltaPivot;
      indicatorIndex = Math.abs(pivotMargin / pivotMarginStep);
      Array.prototype.slice
      .call(document.querySelectorAll('.gauges-list-indicators div'))
      .forEach((element, index) => {
        element.className = index === indicatorIndex ? activeIndicatorClassName : ''; 
      });
    }
    
    gaugesListElement.style.marginLeft = pivotMargin;
  });
};

/**
 * Enable desktop view.
 * Disable touch controls.
 */
export function showDesktopUI() {
  appBody.className = appBody.className.split(mobileAppClassName).join('').trim();
  gaugesListElement.style.marginLeft = 0;
  
  swipeController.off();
};