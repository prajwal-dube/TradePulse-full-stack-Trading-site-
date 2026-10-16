const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const { performance } = require("node:perf_hooks");

const baseUrl = new URL(process.env.BASE_URL || "http://localhost:3002");
const endpoint = process.env.ENDPOINT || "/dashboard-data?limit=100";
const durationSeconds = Number(process.env.DURATION_SECONDS || 15);
const concurrency = Number(process.env.CONCURRENCY || 10);
const label = process.env.LABEL || "local";
const resultFile = process.env.RESULT_FILE;
const remoteHosts = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

if (!["http:", "https:"].includes(baseUrl.protocol)) {
  throw new Error("BASE_URL must use http or https");
}

if (!remoteHosts.has(baseUrl.hostname) && process.env.ALLOW_REMOTE_TARGET !== "true") {
  throw new Error("Remote targets require explicit ALLOW_REMOTE_TARGET=true opt-in");
}

if (!Number.isInteger(durationSeconds) || durationSeconds < 1 || durationSeconds > 120) {
  throw new Error("DURATION_SECONDS must be an integer between 1 and 120");
}

if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 100) {
  throw new Error("CONCURRENCY must be an integer between 1 and 100");
}

const targetUrl = new URL(endpoint, baseUrl);
const client = targetUrl.protocol === "https:" ? https : http;
const latencies = [];
const failures = [];
let bytesReceived = 0;
let completedRequests = 0;
let successfulRequests = 0;

function sendRequest() {
  const startedAt = performance.now();
  const headers = {};
  if (process.env.AUTH_TOKEN) {
    headers.Authorization = `Bearer ${process.env.AUTH_TOKEN}`;
  }

  return new Promise((resolve) => {
    const request = client.get(
      targetUrl,
      { headers, timeout: 15000 },
      (response) => {
        let responseBytes = 0;
        response.on("data", (chunk) => {
          responseBytes += chunk.length;
        });
        response.on("end", () => {
          const elapsed = performance.now() - startedAt;
          latencies.push(elapsed);
          bytesReceived += responseBytes;
          completedRequests += 1;
          if (response.statusCode >= 200 && response.statusCode < 300) {
            successfulRequests += 1;
          } else {
            failures.push(`HTTP ${response.statusCode}`);
          }
          resolve();
        });
      }
    );

    request.on("timeout", () => request.destroy(new Error("Request timed out")));
    request.on("error", (error) => {
      completedRequests += 1;
      failures.push(error.message);
      resolve();
    });
  });
}

function percentile(sortedValues, percentage) {
  if (sortedValues.length === 0) {
    return null;
  }
  const index = Math.ceil((percentage / 100) * sortedValues.length) - 1;
  return sortedValues[Math.max(0, index)];
}

async function runWorker(deadline) {
  while (performance.now() < deadline) {
    await sendRequest();
  }
}

async function main() {
  const startedAt = performance.now();
  const deadline = startedAt + durationSeconds * 1000;
  await Promise.all(
    Array.from({ length: concurrency }, () => runWorker(deadline))
  );
  const elapsedSeconds = (performance.now() - startedAt) / 1000;
  const sortedLatencies = [...latencies].sort((a, b) => a - b);
  const result = {
    label,
    target: targetUrl.origin + targetUrl.pathname + targetUrl.search,
    configuredDurationSeconds: durationSeconds,
    elapsedSeconds: Number(elapsedSeconds.toFixed(2)),
    concurrency,
    requests: completedRequests,
    requestsPerSecond: Number((completedRequests / elapsedSeconds).toFixed(2)),
    successfulRequests,
    successfulRequestsPerSecond: Number(
      (successfulRequests / elapsedSeconds).toFixed(2)
    ),
    latencyMs: {
      p50: percentile(sortedLatencies, 50) === null
        ? null
        : Number(percentile(sortedLatencies, 50).toFixed(2)),
      p95: percentile(sortedLatencies, 95) === null
        ? null
        : Number(percentile(sortedLatencies, 95).toFixed(2)),
      p99: percentile(sortedLatencies, 99) === null
        ? null
        : Number(percentile(sortedLatencies, 99).toFixed(2)),
    },
    averageResponseBytes: completedRequests === 0
      ? null
      : Math.round(bytesReceived / completedRequests),
    failures: failures.length,
    sampleErrors: failures.slice(0, 5),
  };

  const output = `${JSON.stringify(result, null, 2)}\n`;
  process.stdout.write(output);
  if (resultFile) {
    fs.writeFileSync(resultFile, output);
  }
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
