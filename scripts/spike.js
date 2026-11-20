// Spike test: a sudden jump in users, then recovery. Looser thresholds because spikes are expected to hurt.
import { sleep } from 'k6';
import { listCrocodiles } from '../lib/api.js';

export const options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 1 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  listCrocodiles();
  sleep(1);
}
