import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from './config.js';

export function listCrocodiles() {
  const res = http.get(`${BASE_URL}/public/crocodiles/`, { tags: { name: 'list_crocodiles' } });
  check(res, {
    'list: status is 200': (r) => r.status === 200,
    'list: returns items': (r) => r.json().length > 0,
  });
  return res;
}

export function getCrocodile(id) {
  const res = http.get(`${BASE_URL}/public/crocodiles/${id}/`, { tags: { name: 'get_crocodile' } });
  check(res, {
    'get: status is 200': (r) => r.status === 200,
    'get: id matches': (r) => r.json('id') === id,
    'get: has a name': (r) => typeof r.json('name') === 'string',
  });
  return res;
}

export function getMissingCrocodile() {
  const res = http.get(`${BASE_URL}/public/crocodiles/0/`, { tags: { name: 'missing_crocodile' } });
  check(res, { 'missing: status is 404': (r) => r.status === 404 });
  return res;
}
