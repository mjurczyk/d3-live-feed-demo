let mediaQuery;

if (typeof window !== 'undefined') {
  mediaQuery = window.matchMedia('(max-width: 1200px)') 
}

/**
 * Attach a callback to a media query. Callback is called everytime
 * when the viewport changes its state from mobile to desktop and vice
 * versa.
 * Callback is called with a default media query payload: matches, media.
 * 
 * @param {function} callback
 */
export function onMobile(callback) {
  if (typeof callback === 'function') {
    mediaQuery.addListener(callback);
    callback(mediaQuery);
  }
};