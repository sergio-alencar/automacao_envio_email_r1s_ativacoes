// src\StorageMonitor.ts

class StorageMonitor {
  static checkCapacity(): void {
    Logger.log("Starting storage capacity check...");

    const currentBytes = DriveStorageService.getFolderSizeBytes(
      ENV.DRIVE_FOLDER_ID,
    );
    const usageRatio = currentBytes / ENV.STORAGE_LIMIT_BYTES;

    Logger.log(`Current storage usage: ${(usageRatio * 100).toFixed(2)}%`);

    if (usageRatio >= ENV.STORAGE_THRESHOLD_PERCENTAGE) {
      Logger.log("Threshold exceeded. Triggering alert...");
      EmailService.sendStorageAlert(usageRatio);
    } else {
      Logger.log("Storage is within safe limits.");
    }
  }
}
