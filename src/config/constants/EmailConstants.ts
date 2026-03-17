const EMAIL_STYLES = {
  TABLE:
    `style="border-collapse: collapse; ` +
    `width: 100%; ` +
    `max-width: 800px; ` +
    `font-family: Arial, sans-serif;"`,
  TH:
    `style="background-color: ${COLORS.LIGHTER_GRAY}; ` +
    `color: ${COLORS.BLACK_GREEN}; ` +
    `border: 1px solid ${COLORS.DARK_GOLD}; ` +
    `padding: 12px; ` +
    `text-align: left; ` +
    `width: 30%; ` +
    `white-space: nowrap; ` +
    `font-weight: bold;"`,
  TD:
    `style="color: ${COLORS.BLACK_GREEN}; ` +
    `border: 1px solid ${COLORS.DARK_GOLD}; ` +
    `padding: 12px; ` +
    `width: 70%; ` +
    `line-height: 1.5;"`,
  H2_NOTIFICATION: `style="color: ${COLORS.BLACK_GREEN}; padding-bottom: 8px; margin-bottom: 20px;"`,
  H2_ALERT: `style="color: ${COLORS.DARK_GOLD}; padding-bottom: 8px; margin-bottom: 20px;"`,
  TEXT: `style="color: ${COLORS.BLACK_GREEN}; line-height: 1.5;"`,
  LINK: `style="color: ${COLORS.DARK_GOLD}; font-weight: bold; text-decoration: none;"`,
  FOOTER: `style="color: ${COLORS.LIGHT_GRAY}; font-size: 12px; margin-top: 20px;"`,
  MUTED: `style="color: ${COLORS.LIGHT_GRAY};"`,
};

const EMAIL_MESSAGES = {
  FOOTER_SYSTEM: "E-mail gerado e enviado automaticamente pelo sistema. 🤖",
  FOOTER_ALERT: "Alerta de monitoramento gerado automaticamente pelo sistema. 🤖",
  NO_DOCUMENT: "Nenhum documento anexado.",
  ACCESS_DOCUMENT: "📄 Acessar Documento",
  STORAGE_ALERT_SUBJECT: "[ALERTA DE ESPAÇO] Formulário atingindo limite",
};
