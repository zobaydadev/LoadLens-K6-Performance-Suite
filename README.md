# LoadLens K6 Performance Suite

Performance tests written with [k6](https://k6.io) against the QuickPizza demo API (https://quickpizza.grafana.com), a public service Grafana provides for k6 demos. Traffic is kept low so it is safe to run from CI.

## Tests
| Script | Purpose | Load |
|---|---|---|
| `scripts/smoke.js` | Checks the quotes and names endpoints work, plus a 404 case | 1 user, 5 iterations |
| `scripts/load.js` | Normal expected traffic | ramp to 5 users, hold 30s, ramp down |
| `scripts/spike.js` | Sudden burst and recovery | 1 to 10 users quickly |

## Pass/fail rules (thresholds)
- Failed requests under 1% (5% for the spike test)
- 95th percentile response time under 800 ms, 99th under 1500 ms (2000 ms p95 for the spike test)
- More than 99% of checks passing
- A separate p95 limit for the names endpoint in the load test

If a threshold is crossed, k6 exits with a failure code and the CI job fails.

## Structure
```
lib/config.js    base URL and shared thresholds (BASE_URL is overridable)
lib/api.js       one function per endpoint with its checks
scripts/         smoke.js, load.js, spike.js
```

## Run
Install k6 (https://grafana.com/docs/k6/latest/set-up/install-k6/), then:
```bash
k6 run scripts/smoke.js
k6 run scripts/load.js
k6 run scripts/spike.js
k6 run -e BASE_URL=https://your-host scripts/smoke.js
```

## CI
`.github/workflows/k6.yml` runs all three scripts on every push and uploads the load test summary as an artifact.

## Run with Docker
No local k6 install needed:
```bash
docker build -t loadlens-k6 .
docker run --rm loadlens-k6                       # smoke test
docker run --rm loadlens-k6 scripts/load.js        # load test
```
