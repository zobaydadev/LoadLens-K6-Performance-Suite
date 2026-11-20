import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from './config.js';

export function listQuotes() {
  const res = http.get(`${BASE_URL}/api/quotes`, { tags: { name: 'list_quotes' } });
  check(res, {
    'quotes: status is 200': (r) => r.status === 200,
    'quotes: is JSON': (r) => (r.headers['Content-Type'] || '').includes('application/json'),
    'quotes: has items': (r) => r.json('quotes').length > 0,
  });
  return res;
}

export function listNames() {
  const res = http.get(`${BASE_URL}/api/names`, { tags: { name: 'list_names' } });
  check(res, {
    'names: status is 200': (r) => r.status === 200,
    'names: has items': (r) => r.json('names').length > 0,
    'names: contains Margherita': (r) => r.json('names').includes('Margherita'),
  });
  return res;
}

export function getMissingEndpoint() {
  // A 404 is the expected answer here, so tell k6 not to count it as a failed request.
  const res = http.get(`${BASE_URL}/api/nothing-here`, {
    tags: { name: 'missing_endpoint' },
    responseCallback: http.expectedStatuses(404),
  });
  check(res, { 'missing: status is 404': (r) => r.status === 404 });
  return res;
}
