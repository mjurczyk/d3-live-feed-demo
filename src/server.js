/**
 * Initial application state from the server-side.
 * 
 * @mock
 */
export const initialState = [
  {
    label: 'revenue',
    primary: {
      label: 'tablet',
      value: 120000,
      valueUnit: '€',
      color: '#5dd529'
    },
    secondary: {
      label: 'smartphone',
      value: 80000,
      valueUnit: '€',
      color: '#006c02'
    },
    pushHistory: [0, 10, 9, 8, 7, 5, 4, 5, 4, 3]
  },
  {
    label: 'impressions',
    primary: {
      label: 'tablet',
      value: 20000000,
      color: '#09cde8'
    },
    secondary: {
      label: 'smartphone',
      value: 30000000,
      color: '#1b506c'
    },
    pushHistory: [0, 4, 7, 5, 3, 6, 8, 5, 4, 6, 7, 7, 5, 2, 1]
  },
  {
    label: 'visits',
    primary: {
      label: 'tablet',
      value: 48000000,
      color: '#ffc402'
    },
    secondary: {
      label: 'smartphone',
      value: 12000000,
      color: '#d95a15'
    },
    pushHistory: [5, 4, 2, 6, 8, 4, 5, 5, 8, 5, 6, 5]
  }
];

export let lastState = initialState;

/**
 * Update the mocked application state.
 * Mutates state.
 * 
 * @mock
 * @returns {object} new server state
 */
export function getServerState() {
  lastState = lastState.map(data => {
    data.pushHistory.push(~~(Math.random() * 8) + 2);
    
    return data;
  });
};