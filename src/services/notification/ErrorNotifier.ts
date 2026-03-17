class ErrorNotifier {
  private static readonly SUBJECT = `[ALERTA DE ERRO] Automação R1/Ativação falhou`;

  private static readonly DEFAULT_ERROR = "Erro desconhecido";
  private static readonly DEFAULT_STACK = "Stack trace indisponível";
  private static readonly DEFAULT_CONTEXT = "Contexto não fornecido";
  private static readonly PARSE_ERROR_CONTEXT = "Não foi possível converter o texto para JSON.";

  private static readonly PRE_STYLE =
    'style="font-size: 12px; ' +
    "overflow-x: auto; " +
    `background-color: ${COLORS.CODE_BG}; ` +
    "padding: 10px; " +
    `border: 1px solid ${COLORS.CODE_BORDER}; ` +
    'border-radius: 4px;"';

  static notify(error: Error, eventContext?: any): void {
    const errorMessage = error.message || this.DEFAULT_ERROR;
    const stackTrace = error.stack || this.DEFAULT_STACK;
    const contextString = this.safelyParseContext(eventContext);

    const htmlBody = this.buildErrorHtml(errorMessage, stackTrace, contextString);

    MailApp.sendEmail({
      to: ENV.ADMIN_EMAILS.join(","),
      subject: this.SUBJECT,
      htmlBody: htmlBody,
    });

    Logger.log(`[ErrorNotifier] Error alert sent to: ${ENV.ADMIN_EMAILS.join(",")}`);
  }

  private static safelyParseContext(context?: any): string {
    if (!context) {
      return this.DEFAULT_CONTEXT;
    }

    try {
      return JSON.stringify(context, null, 2);
    } catch (e) {
      return this.PARSE_ERROR_CONTEXT;
    }
  }

  private static buildErrorHtml(
    errorMessage: string,
    stackTrace: string,
    contextString: string,
  ): string {
    return `
      <div ${EmailTemplateBuilder.BASE_CONTAINER_STYLE}>
        <h2 ${EMAIL_STYLES.H2_ALERT}>
          Erro na Execução do Script
        </h2>
        <p ${EMAIL_STYLES.TEXT}>
          Ocorreu um erro inesperado durante o processamento de uma resposta do formulário.
        </p>
        
        <h3 ${EMAIL_STYLES.TEXT}>
          Detalhes do Erro:
        </h3>
        <pre ${this.PRE_STYLE}>
          ${errorMessage}
        </pre>
        <br>
        
        <h3 ${EMAIL_STYLES.TEXT}>
          Stack Trace (Rastreamento):
        </h3>
        <pre ${this.PRE_STYLE}>
          ${stackTrace}
        </pre>
        <br>
        
        <h3 ${EMAIL_STYLES.TEXT}>
          Contexto do Evento (Payload):
        </h3>
        <pre ${this.PRE_STYLE}>
          ${contextString}
        </pre>
        
        <br>
        <p ${EMAIL_STYLES.FOOTER}>
          <i>${EMAIL_MESSAGES.FOOTER_SYSTEM}</i>
        </p>
      </div>
    `;
  }
}
