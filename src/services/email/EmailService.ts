class EmailService {
  static sendNotification(data: CustomerSubmission): void {
    const subject = `${data.type} - ${data.customerName}`;
    const htmlBody = EmailTemplateBuilder.buildNotificationHtml(data);

    this.executeEmailSend(ENV.TARGET_EMAIL, subject, htmlBody);

    Logger.log(
      `[EmailService] Notification email successfully sent to ${ENV.TARGET_EMAIL} for customer: ${data.customerName}`,
    );
  }

  static sendStorageAlert(usageRatio: number): void {
    const percentage = (usageRatio * 100).toFixed(1);
    const subject = `${EMAIL_MESSAGES.STORAGE_ALERT_SUBJECT} (${percentage}%)`;
    const htmlBody = EmailTemplateBuilder.buildStorageAlertHtml(percentage);

    this.executeEmailSend(ENV.ADMIN_EMAILS.join(","), subject, htmlBody);

    Logger.log(
      `[EmailService] Storage alert email sent to ${ENV.ADMIN_EMAILS}. Usage: ${percentage}%`,
    );
  }

  private static executeEmailSend(to: string, subject: string, htmlBody: string): void {
    MailApp.sendEmail({ to, subject, htmlBody });
  }
}
