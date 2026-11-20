// Smoke test: one user, a few iterations. Confirms the endpoints work before heavier tests.
import { sleep } from 'k6';
import { defaultThresholds } from '../lib/config.js';
import { listCrocodiles, getCrocodile, getMissingCrocodile } from '../lib/api.js';

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: defaultThresholds,
};

export default function () {
  listCrocodiles();
  getCrocodile(1);
  getMissingCrocodile();
  sleep(1);
}
