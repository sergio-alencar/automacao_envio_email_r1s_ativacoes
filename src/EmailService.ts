// src\EmailService.ts

class EmailService {
  static sendNotification(data: CustomerSubmission): void {
    const subject = `${data.type} - ${data.customerName}`;
    const htmlBody = this.buildHtmlGrid(data);

    MailApp.sendEmail({
      to: ENV.TARGET_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
    });

    Logger.log(
      `Notification email successfully sent to ${ENV.TARGET_EMAIL} for customer: ${data.customerName}`,
    );
  }

  private static buildHtmlGrid(data: CustomerSubmission): string {
    const styles = `
      style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;"
    `;
    const thStyles = `style="background-color: #f2f2f2; border: 1px solid #ddd; padding: 8px; text-align: left; width: auto; white-space: nowrap;"`;
    const tdStyles = `style="border: 1px solid #ddd; padding: 8px; width: auto;"`;

    const formattedDocument = DocumentFormatter.formatCpfCnpj(
      data.customerDocument,
    );
    const formattedDate = DateFormatter.formatToBR(data.date);

    const productListHtml = data.products
      .split(",")
      .map((item) => item.trim())
      .join("<br>");

    let documentsHtml = data.documents;
    if (data.documents && data.documents !== "N/A") {
      documentsHtml = data.documents
        .split(",")
        .map(
          (url, index) =>
            `<a href="${url.trim()}" target="_blank" style="color: #1a73e8; text-decoration: none;">📄 Acessar Documento ${index + 1}</a>`,
        )
        .join("<br><br>");
    } else {
      documentsHtml = "<i>Nenhum documento anexado.</i>";
    }

    return `
      <h2>Nova resposta ao formulário</h2>
      <table ${styles}>
        <tr><th ${thStyles}>${ENV.FORM_HEADERS.TYPE}</th><td ${tdStyles}><strong>${data.type}</strong></td></tr>
        <tr><th ${thStyles}>Nome do Cliente</th><td ${tdStyles}>${data.customerName}</td></tr>
        <tr><th ${thStyles}>${ENV.FORM_HEADERS.CUSTOMER_DOC}</th><td ${tdStyles}>${formattedDocument}</td></tr>
        <tr><th ${thStyles}>${ENV.FORM_HEADERS.DATE}</th><td ${tdStyles}>${formattedDate}</td></tr>
        <tr><th ${thStyles}>${ENV.FORM_HEADERS.PRODUCT}</th><td ${tdStyles}>${productListHtml}</td></tr>
        <tr><th ${thStyles}>${ENV.FORM_HEADERS.TAX_REGIME}</th><td ${tdStyles}>${data.taxRegime}</td></tr>
        <tr><th ${thStyles}>Nome do Executivo</th><td ${tdStyles}>${data.consultantName}</td></tr>
        <tr><th ${thStyles}>${ENV.FORM_HEADERS.DOCUMENTS}</th><td ${tdStyles}>${documentsHtml}</td></tr>
      </table>

      <br>
      <p style="color: #666; font-size: 12px;">
        <i>E-mail enviado automaticamente. 🤖</i>
      </p>
    `;
  }
}
