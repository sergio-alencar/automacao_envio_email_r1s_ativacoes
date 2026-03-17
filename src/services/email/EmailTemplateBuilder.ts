class EmailTemplateBuilder {
  static readonly BASE_CONTAINER_STYLE = `style="font-family: Arial, sans-serif; padding: 10px;"`;

  private static readonly TITLE_NOTIFICATION = "Nova resposta ao formulário";
  private static readonly TITLE_ALERT = "Atenção: Limite de Armazenamento Próximo";

  private static readonly CUSTOMER_NAME_ROW = "Nome do Cliente";
  private static readonly CONSULTANT_NAME_ROW = "Nome do Executivo";

  private static buildBaseLayout(content: string, footerText: string): string {
    return `
      <div ${this.BASE_CONTAINER_STYLE}>
        ${content}
        <br>
        <p ${EMAIL_STYLES.FOOTER}>
          <i>${footerText}</i>
        </p>
      </div>
    `;
  }

  static buildNotificationHtml(data: CustomerSubmission): string {
    const formattedDocument = DocumentFormatter.formatCpfCnpj(data.customerDocument);
    const formattedDate = DateFormatter.formatToBR(data.date);

    const productListHtml = data.products
      .split(",")
      .map((item) => item.trim())
      .join("<br>");

    const documentsHtml = this.buildDocumentsHtml(data.documents);

    const content = `
      <h2 ${EMAIL_STYLES.H2_NOTIFICATION}>
        ${this.TITLE_NOTIFICATION}
      </h2>
      <table ${EMAIL_STYLES.TABLE}>
        ${this.buildTableRow(ENV.FORM_HEADERS.TYPE, `<strong>${data.type}</strong>`)}
        ${this.buildTableRow(this.CUSTOMER_NAME_ROW, data.customerName)}
        ${this.buildTableRow(ENV.FORM_HEADERS.CUSTOMER_DOC, formattedDocument)}
        ${this.buildTableRow(ENV.FORM_HEADERS.DATE, formattedDate)}
        ${this.buildTableRow(ENV.FORM_HEADERS.PRODUCT, productListHtml)}
        ${this.buildTableRow(ENV.FORM_HEADERS.TAX_REGIME, data.taxRegime)}
        ${this.buildTableRow(this.CONSULTANT_NAME_ROW, data.consultantName)}
        ${this.buildTableRow(ENV.FORM_HEADERS.SOURCE_PARTNER, data.sourcePartner)}
        ${this.buildTableRow(ENV.FORM_HEADERS.DOCUMENTS, documentsHtml)}
      </table>
    `;

    return this.buildBaseLayout(content, EMAIL_MESSAGES.FOOTER_SYSTEM);
  }

  static buildStorageAlertHtml(percentage: string): string {
    const alertMessage1 = `A pasta de anexos do formulário no Google Drive está operando com <strong>${percentage}%</strong> da sua capacidade de 1 GB.`;
    const alertMessage2 = `Recomendamos aumentar o limite do formulário para 10 GB nas configurações do Google Forms ou limpar arquivos antigos para evitar que novas respostas sejam bloqueadas.`;

    const content = `
      <h2 ${EMAIL_STYLES.H2_ALERT}>
        ${this.TITLE_ALERT}
      </h2>
      <p ${EMAIL_STYLES.TEXT}>
        ${alertMessage1}
      </p>
      <p ${EMAIL_STYLES.TEXT}>
        ${alertMessage2}
      </p>
    `;

    return this.buildBaseLayout(content, EMAIL_MESSAGES.FOOTER_ALERT);
  }

  private static buildTableRow(header: string, value: string): string {
    return `
      <tr>
        <th ${EMAIL_STYLES.TH}>
          ${header}
        </th>
        <td ${EMAIL_STYLES.TD}>
          ${value}
        </td>
      </tr>
    `;
  }

  private static buildDocumentsHtml(documents: string): string {
    if (!documents || documents === FORM_CONSTANTS.FALLBACK_VALUE) {
      return `
        <i ${EMAIL_STYLES.MUTED}>
          ${EMAIL_MESSAGES.NO_DOCUMENT}
        </i>
      `;
    }

    return documents
      .split(",")
      .map(
        (url, index) => `
          <a
            href="${url.trim()}"
            target="_blank"
            ${EMAIL_STYLES.LINK}>${EMAIL_MESSAGES.ACCESS_DOCUMENT} ${index + 1}
          </a>
        `,
      )
      .join("<br><br>");
  }
}
