class ErrorNotifier {
  private static readonly SUBJECT = `[ALERTA DE ERRO] Automação R1/Ativação falhou`;

  private static readonly DEFAULT_ERROR = "Erro desconhecido";
  private static readonly DEFAULT_STACK = "Stack trace indisponível";
  private static readonly DEFAULT_CONTEXT = "Contexto não fornecido";
  private static readonly PARSE_ERROR_CONTEXT = "Não foi possível converter o texto para JSON.";

  static notify(error: Error, eventContext?: any): void {
    const errorMessage = error.message || this.DEFAULT_ERROR;
    const stackTrace = error.stack || this.DEFAULT_STACK;
    const contextString = this.safelyParseContext(eventContext);

    const template = HtmlService.createTemplateFromFile("errorAlert");
    template.colors = COLORS;
    template.errorMessage = errorMessage;
    template.stackTrace = stackTrace;
    template.contextString = contextString;

    const htmlBody = template.evaluate().getContent();

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
}
