// src\DriveStorageService.ts

class DriveStorageService {
  static getFolderSizeBytes(folderId: string): number {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();
    let totalBytes = 0;

    while (files.hasNext()) {
      const file = files.next();
      totalBytes += file.getSize();
    }

    return totalBytes;
  }
}
