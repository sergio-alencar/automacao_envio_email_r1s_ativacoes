// src\FormHandler.ts

class FormHandler {
  static parseEvent(
    e: GoogleAppsScript.Events.SheetsOnFormSubmit,
  ): CustomerSubmission {
    function getValue(columnName: string): string {
      const valueArray = e.namedValues[columnName];
      return valueArray?.[0] || "N/A";
    }

    const { FORM_HEADERS } = ENV;

    return {
      timestamp: getValue(FORM_HEADERS.TIMESTAMP),
      consultantName: getValue(FORM_HEADERS.CONSULTANT_NAME),
      type: getValue(FORM_HEADERS.TYPE),
      customerDocument: getValue(FORM_HEADERS.CUSTOMER_DOC),
      customerName: getValue(FORM_HEADERS.CUSTOMER_NAME),
      date: getValue(FORM_HEADERS.DATE),
      products: getValue(FORM_HEADERS.PRODUCT),
      taxRegime: getValue(FORM_HEADERS.TAX_REGIME),
      documents: getValue(FORM_HEADERS.DOCUMENTS),
    };
  }
}
