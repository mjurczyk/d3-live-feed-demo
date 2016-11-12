import { initialState, getServerState } from './server';
import { onMobile } from './utils/onMobile';
import { showMobileUI, showDesktopUI } from './controller/ui';
import { Gauge } from './view/gauge/Gauge';

import '../assets/styles.css';

/**
 * Server query interval in ms.
 */
const SERVER_UPDATE_INTERVAL = 1500;

/**
 * Initialize UI according to the server-fetched data.
 */
export function initializeUI() {
  const gaugesListDom = document.querySelector('.app .gauges-list');
  
  initialState.forEach((data, index) => {
    Gauge({
      parent: gaugesListDom,
      id: 'gauge-' + index,
      model: data
    });
  });
  
  onMobile(({ media, matches }) => {
    if (matches) {
      showMobileUI(); 
    } else {
      showDesktopUI();
    }
  });
};

/**
 * Fetch data from the server.
 * Query the server every {SERVER_UPDATE_INTERVAL} seconds.
 */
export function fetchServerState() {
  setInterval(getServerState, SERVER_UPDATE_INTERVAL);
};

/**
 * Initialize app.
 */
initializeUI();
fetchServerState();
