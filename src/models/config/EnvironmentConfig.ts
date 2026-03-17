interface EnvironmentConfig {
  TARGET_EMAIL: string;
  ADMIN_EMAILS: string[];
  SPREADSHEET_ID: string;

  FORM_HEADERS: {
    TIMESTAMP: string;
    CONSULTANT_NAME: string;
    TYPE: string;
    CUSTOMER_DOC: string;
    CUSTOMER_NAME: string;
    SOURCE_PARTNER: string;
    DATE: string;
    PRODUCT: string;
    TAX_REGIME: string;
    DOCUMENTS: string;
  };

  DRIVE_FOLDER_ID: string;
  STORAGE_LIMIT_BYTES: number;
  STORAGE_THRESHOLD_PERCENTAGE: number;
}
