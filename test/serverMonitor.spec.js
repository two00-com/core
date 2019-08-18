import { serverMonitor } from "../src";

test("serverMonitor | test if object holds correct keys, and types", () => {
  expect(serverMonitor).toBeTruthy();
  expect(typeof serverMonitor).toBe("function");
});
