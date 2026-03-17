class EmailTemplateBuilder {
  private static readonly CUSTOMER_NAME_ROW = "Nome do Cliente";
  private static readonly CONSULTANT_NAME_ROW = "Nome do Executivo";

  static buildNotificationHtml(data: CustomerSubmission): string {
    const formattedDocument = DocumentFormatter.formatCpfCnpj(data.customerDocument);
    const formattedDate = DateFormatter.formatToBR(data.date);

    const productListHtml = data.products
      .split(",")
      .map((item) => item.trim())
      .join("<br>");

    const documentsArray =
      !data.documents || data.documents === FORM_CONSTANTS.FALLBACK_VALUE
        ? []
        : data.documents.split(",").map((url) => url.trim());

    const rowsData = [
      { label: ENV.FORM_HEADERS.TYPE, value: `<strong>${data.type}</strong>` },
      { label: this.CUSTOMER_NAME_ROW, value: data.customerName },
      { label: ENV.FORM_HEADERS.CUSTOMER_DOC, value: formattedDocument },
      { label: ENV.FORM_HEADERS.DATE, value: formattedDate },
      { label: ENV.FORM_HEADERS.PRODUCT, value: productListHtml },
      { label: ENV.FORM_HEADERS.TAX_REGIME, value: data.taxRegime },
      { label: this.CONSULTANT_NAME_ROW, value: data.consultantName },
      { label: ENV.FORM_HEADERS.SOURCE_PARTNER, value: data.sourcePartner },
    ];

    const template = HtmlService.createTemplateFromFile("notification");
    template.colors = COLORS;
    template.rows = rowsData;
    template.documents = documentsArray;

    return template.evaluate().getContent();
  }

  static buildStorageAlertHtml(percentage: string): string {
    const template = HtmlService.createTemplateFromFile("storageAlert");
    template.colors = COLORS;
    template.percentage = percentage;

    return template.evaluate().getContent();
  }
}
