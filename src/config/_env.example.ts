// src\_env.example.ts

const ENV_EXAMPLE: EnvironmentConfig = {
  TARGET_EMAIL: "target_email@domain.com",
  ADMIN_EMAILS: "admin_email@domain.com",
  SPREADSHEET_ID: "spreadsheet_id",

  FORM_HEADERS: {
    TIMESTAMP: "Timestamp Column",
    CONSULTANT_NAME: "Consultant Name Column",
    TYPE: "Type Column",
    CUSTOMER_DOC: "Document Column",
    CUSTOMER_NAME: "Customer Name Column",
    SOURCE_PARTNER: "Source/Partner Name Column",
    DATE: "Date Column",
    PRODUCT: "Product Column",
    TAX_REGIME: "Tax Regime Column",
    DOCUMENTS: "Documents Column",
  },

  DRIVE_FOLDER_ID: "folder_id",
  STORAGE_LIMIT_BYTES: 1073741824, // 1 GB
  STORAGE_THRESHOLD_PERCENTAGE: 0.85,
};
