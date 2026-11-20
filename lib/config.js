// Shared settings. Override the target with: k6 run -e BASE_URL=https://example.com scripts/smoke.js
export const BASE_URL = __ENV.BASE_URL || 'https://test-api.k6.io';

export const defaultThresholds = {
  http_req_failed: ['rate<0.01'],
  http_req_duration: ['p(95)<800', 'p(99)<1500'],
  checks: ['rate>0.99'],
};
