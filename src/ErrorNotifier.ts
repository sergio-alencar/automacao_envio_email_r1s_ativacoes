// src\ErrorNotifier.ts

class ErrorNotifier {
  static notify(error: Error, eventContext?: any): void {
    const subject = `[ALERTA DE ERRO] Automação R1/Ativação falhou`;

    const errorMessage = error.message || "Erro desconhecido";
    const stackTrace = error.stack || "Stack trace indisponível";

    let contextString = "Contexto não fornecido";

    try {
      if (eventContext) {
        contextString = JSON.stringify(eventContext, null, 2);
      }
    } catch (e) {
      contextString = "Não foi possível converter o contexto para JSON.";
    }

    const htmlBody = `
      <h2>Erro na Execução do Script</h2>
      <p>
        Ocorreu um erro inesperado durante o processamento de uma resposta do formulário.
      </p>
      
      <h3>Detalhes do Erro:</h3>
      <pre style="font-size: 12px; overflow-x: auto;">
        ${errorMessage}
      </pre>
      <br>
      
      <h3>Stack Trace (Rastreamento):</h3>
      <pre style="font-size: 12px; overflow-x: auto;">
        ${stackTrace}
      </pre>
      <br>
      
      <h3>Contexto do Evento (Payload):</h3>
      <pre style="font-size: 12px; overflow-x: auto;">
        ${contextString}
      </pre>
      
      <br>
      <p style="color: #666; font-size: 12px;">
        <i>E-mail de monitoramento do Google Apps Script. Enviado automaticamente. 🤖</i>
      </p>
    `;

    MailApp.sendEmail({
      to: ENV.ADMIN_EMAILS,
      subject: subject,
      htmlBody: htmlBody,
    });

    Logger.log(
      `[ErrorNotifier] Error alert successfully sent to: ${ENV.ADMIN_EMAILS}`,
    );
  }
}
