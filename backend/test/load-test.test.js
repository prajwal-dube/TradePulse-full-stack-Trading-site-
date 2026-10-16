const test = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const http = require("node:http");
const path = require("node:path");

test("load-test script reports successful local request measurements", async () => {
  const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ ok: true }));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  const address = server.address();
  const scriptPath = path.join(__dirname, "..", "scripts", "load-test.js");
  const output = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], {
      env: {
        ...process.env,
        BASE_URL: `http://127.0.0.1:${address.port}`,
        DURATION_SECONDS: "1",
        CONCURRENCY: "2",
        LABEL: "unit-test",
        RESULT_FILE: "",
        AUTH_TOKEN: "",
      },
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`load-test exited ${code}: ${stderr}`));
        return;
      }
      resolve(stdout);
    });
  });
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );

  const result = JSON.parse(output);
  assert.equal(result.label, "unit-test");
  assert.ok(result.successfulRequests > 0);
  assert.equal(result.failures, 0);
  assert.ok(result.latencyMs.p95 >= result.latencyMs.p50);
});
