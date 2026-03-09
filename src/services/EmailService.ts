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
    const tableStyles = `
      style="border-collapse: collapse; width: 100%; max-width: 800px; font-family: Arial, sans-serif;"
    `;

    const thStyles = `style="background-color: ${COLORS.LIGHTER_GRAY}; color: ${COLORS.BLACK_GREEN}; border: 1px solid ${COLORS.DARK_GOLD}; padding: 12px; text-align: left; width: 30%; white-space: nowrap; font-weight: bold;"`;
    const tdStyles = `style="color: ${COLORS.BLACK_GREEN}; border: 1px solid ${COLORS.DARK_GOLD}; padding: 12px; width: 70%; line-height: 1.5;"`;

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
            `<a href="${url.trim()}" target="_blank" style="color: ${COLORS.DARK_GOLD}; font-weight: bold; text-decoration: none;">📄 Acessar Documento ${index + 1}</a>`,
        )
        .join("<br><br>");
    } else {
      documentsHtml = `<i style="color: ${COLORS.LIGHT_GRAY};">Nenhum documento anexado.</i>`;
    }

    return `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color: ${COLORS.BLACK_GREEN}; padding-bottom: 8px; margin-bottom: 20px;">
          Nova resposta ao formulário
        </h2>
        
        <table ${tableStyles}>
          <tr><th ${thStyles}>${ENV.FORM_HEADERS.TYPE}</th><td ${tdStyles}><strong>${data.type}</strong></td></tr>
          <tr><th ${thStyles}>Nome do Cliente</th><td ${tdStyles}>${data.customerName}</td></tr>
          <tr><th ${thStyles}>${ENV.FORM_HEADERS.CUSTOMER_DOC}</th><td ${tdStyles}>${formattedDocument}</td></tr>
          <tr><th ${thStyles}>${ENV.FORM_HEADERS.DATE}</th><td ${tdStyles}>${formattedDate}</td></tr>
          <tr><th ${thStyles}>${ENV.FORM_HEADERS.PRODUCT}</th><td ${tdStyles}>${productListHtml}</td></tr>
          <tr><th ${thStyles}>${ENV.FORM_HEADERS.TAX_REGIME}</th><td ${tdStyles}>${data.taxRegime}</td></tr>
          <tr><th ${thStyles}>Nome do Executivo</th><td ${tdStyles}>${data.consultantName}</td></tr>
          <tr><th ${thStyles}>${ENV.FORM_HEADERS.SOURCE_PARTNER}</th><td ${tdStyles}>${data.sourcePartner}</td></tr>
          <tr><th ${thStyles}>${ENV.FORM_HEADERS.DOCUMENTS}</th><td ${tdStyles}>${documentsHtml}</td></tr>
        </table>

        <br>
        <p style="color: ${COLORS.LIGHT_GRAY}; font-size: 12px; margin-top: 20px;">
          <i>E-mail gerado e enviado automaticamente pelo sistema. 🤖</i>
        </p>
      </div>
    `;
  }

  static sendStorageAlert(usageRatio: number): void {
    const percentage = (usageRatio * 100).toFixed(1);
    const subject = `[ALERTA DE ESPAÇO] Formulário atingindo limite (${percentage}%)`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2 style="color: ${COLORS.DARK_GOLD}; padding-bottom: 8px; margin-bottom: 20px;">
          Atenção: Limite de Armazenamento Próximo
        </h2>
        <p style="color: ${COLORS.BLACK_GREEN}; line-height: 1.5;">
          A pasta de anexos do formulário no Google Drive está operando com <strong>${percentage}%</strong> da sua capacidade de 1 GB.
        </p>
        <p style="color: ${COLORS.BLACK_GREEN}; line-height: 1.5;">
          Recomendamos aumentar o limite do formulário para 10 GB nas configurações do Google Forms ou limpar arquivos antigos para evitar que novas respostas sejam bloqueadas.
        </p>
        <br>
        <p style="color: ${COLORS.LIGHT_GRAY}; font-size: 12px; margin-top: 20px;">
          <i>Alerta de monitoramento gerado automaticamente pelo sistema. 🤖</i>
        </p>
      </div>
    `;

    MailApp.sendEmail({
      to: ENV.ADMIN_EMAILS,
      subject: subject,
      htmlBody: htmlBody,
    });

    Logger.log(
      `[EmailService] Storage alert email sent to ${ENV.ADMIN_EMAILS}. Usage: ${percentage}%`,
    );
  }
}
