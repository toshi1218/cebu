import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    timeout: 60000,
    expect: { timeout: 10000 },
    retries: 1,
    reporter: [["html", { open: "never" }], ["list"]],
    use: {
        baseURL: process.env.BASE_URL || "http://127.0.0.1:5500",
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        video: "retain-on-failure"
    },
    projects: [
        { name: "iPhone SE", use: { ...devices["iPhone SE"] } },
        { name: "iPhone 14", use: { ...devices["iPhone 14"] } },
        { name: "Pixel 7", use: { ...devices["Pixel 7"] } },
        { name: "iPad (gen 7)", use: { ...devices["iPad (gen 7)"] } }
    ]
});
