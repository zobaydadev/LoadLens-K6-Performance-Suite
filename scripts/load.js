// Load test: ramp up to a modest number of virtual users, hold, then ramp down.
import { sleep } from 'k6';
import { defaultThresholds } from '../lib/config.js';
import { listQuotes, listNames } from '../lib/api.js';

export const options = {
  stages: [
    { duration: '15s', target: 5 },
    { duration: '30s', target: 5 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    ...defaultThresholds,
    'http_req_duration{name:list_names}': ['p(95)<800'],
  },
};

export default function () {
  listQuotes();
  listNames();
  sleep(1);
}
