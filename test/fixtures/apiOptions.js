export const apiOptionsFixture = {
  config: {
    apiVersion: "0",
    api: {
      enableMonitors: true,
      timeout: 3000,
      url:
        process.env.NODE_ENV === "production"
          ? "https://api.two00.xyz"
          : "http://localhost:2017",
      routes: {
        serverMonitor: {
          healthCheck: "/rest/health-check",
        },
      },
    },
  },
  onError: () => {},
  onUpdateAvailable: () => {},
};
