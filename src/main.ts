// src\main.ts

function onFormSubmitTrigger(
  e: GoogleAppsScript.Events.SheetsOnFormSubmit,
): void {
  try {
    Logger.log("Starting form submission processing...");

    if (!e || !e.namedValues) {
      throw new Error(
        "Event object is empty or invalid. Ensure this is triggered by a form submission.",
      );
    }

    const submissionData = FormHandler.parseEvent(e);

    const cleanedDoc = submissionData.customerDocument.replace(/\D/g, "");

    if (cleanedDoc.length === 14) {
      Logger.log(
        `CNPJ detected. Attempting to fetch Razão Social for: ${cleanedDoc}`,
      );
      const razaoSocial = CnpjService.getRazaoSocial(cleanedDoc);

      if (razaoSocial) {
        Logger.log(
          `Razão Social found: ${razaoSocial}. Replacing original name.`,
        );
        submissionData.customerName = razaoSocial;
      } else {
        Logger.log(
          `Could not fetch Razão Social. Using the name provided in the form.`,
        );
      }
    }

    EmailService.sendNotification(submissionData);

    Logger.log("Form submission processed and email sent successfully.");
  } catch (error) {
    const err = error as Error;
    Logger.log(`Error processing form submission: ${err.message}`);

    ErrorNotifier.notify(err, e);
  }
}
