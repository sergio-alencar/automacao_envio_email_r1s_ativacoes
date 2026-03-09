// src\setup.ts

function setupDailyStorageMonitor(): void {
  const functionName = "onStorageMonitorTrigger";

  const existingTriggers = ScriptApp.getProjectTriggers();
  for (const trigger of existingTriggers) {
    if (trigger.getHandlerFunction() === functionName) {
      Logger.log(`The trigger for ${functionName} is already configured.`);
      return;
    }
  }

  ScriptApp.newTrigger(functionName)
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .create();

  Logger.log(`Successfully created daily trigger for: ${functionName}.`);
}
