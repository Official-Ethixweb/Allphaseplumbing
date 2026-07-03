import { chromium } from "playwright";

const browser = await chromium.launch({
  args: ["--remote-debugging-port=9222"],
});
console.log("chrome up on 9222");
// keep alive until killed
await new Promise(() => {});
