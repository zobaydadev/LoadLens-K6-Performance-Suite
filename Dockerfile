FROM grafana/k6:0.54.0

WORKDIR /tests

COPY lib ./lib
COPY scripts ./scripts

# Default is the smoke test. Pass another script as the container command.
ENTRYPOINT ["k6", "run"]
CMD ["scripts/smoke.js"]
