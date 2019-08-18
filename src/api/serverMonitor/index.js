const serverMonitor = (api, options) => ({
  ping: (serverMonitorId, serverMonitor) =>
    api.post(
      `${options.config.api.routes.serverMonitor.healthCheck}/${serverMonitorId}`,
      { serverMonitor }
    ),
});

export { serverMonitor };
