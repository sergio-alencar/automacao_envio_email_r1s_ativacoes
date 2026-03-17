const TRIGGER_SETTINGS = {
  FUNCTION_NAME: "onStorageMonitorTrigger",
  HOUR_OF_DAY: 8,
  INTERVAL_DAYS: 1,
};

function setupDailyStorageMonitor(): void {
  const existingTriggers = ScriptApp.getProjectTriggers();

  const isAlreadyConfigured = existingTriggers.some(
    (trigger) => trigger.getHandlerFunction() === TRIGGER_SETTINGS.FUNCTION_NAME,
  );

  if (isAlreadyConfigured) {
    Logger.log(`The trigger for ${TRIGGER_SETTINGS.FUNCTION_NAME} is already configured.`);
    return;
  }

  ScriptApp.newTrigger(TRIGGER_SETTINGS.FUNCTION_NAME)
    .timeBased()
    .atHour(TRIGGER_SETTINGS.HOUR_OF_DAY)
    .everyDays(TRIGGER_SETTINGS.INTERVAL_DAYS)
    .create();

  Logger.log(`Successfully created daily trigger for: ${TRIGGER_SETTINGS.FUNCTION_NAME}.`);
}
