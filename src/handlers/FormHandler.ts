class FormHandler {
  static parseEvent(e: GoogleAppsScript.Events.SheetsOnFormSubmit): CustomerSubmission {
    const { FORM_HEADERS } = ENV;

    return {
      timestamp: this.extractValue(e, FORM_HEADERS.TIMESTAMP),
      consultantName: this.extractValue(e, FORM_HEADERS.CONSULTANT_NAME),
      type: this.extractValue(e, FORM_HEADERS.TYPE),
      customerDocument: this.extractValue(e, FORM_HEADERS.CUSTOMER_DOC),
      customerName: this.extractValue(e, FORM_HEADERS.CUSTOMER_NAME),
      date: this.extractValue(e, FORM_HEADERS.DATE),
      products: this.extractValue(e, FORM_HEADERS.PRODUCT),
      sourcePartner: this.extractValue(e, FORM_HEADERS.SOURCE_PARTNER),
      taxRegime: this.extractValue(e, FORM_HEADERS.TAX_REGIME),
      documents: this.extractValue(e, FORM_HEADERS.DOCUMENTS),
    };
  }

  private static extractValue(
    e: GoogleAppsScript.Events.SheetsOnFormSubmit,
    columnName: string,
  ): string {
    const valueArray = e.namedValues[columnName];
    return valueArray?.[0] || FORM_CONSTANTS.FALLBACK_VALUE;
  }
}
