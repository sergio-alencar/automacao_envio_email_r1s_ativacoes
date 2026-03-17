function onFormSubmitTrigger(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
  try {
    Logger.log("Starting form submission processing...");

    if (!e || !e.namedValues) {
      throw new Error(
        "Event object is empty or invalid. Ensure this is triggered by a form submission.",
      );
    }

    const submissionData = FormHandler.parseEvent(e);

    Logger.log(`Attempting to fetch Razão Social for document: ${submissionData.customerDocument}`);

    const razaoSocial = CnpjService.getRazaoSocial(submissionData.customerDocument);

    if (razaoSocial) {
      Logger.log(`Razão Social found: ${razaoSocial}. Replacing original name.`);
      submissionData.customerName = razaoSocial;
    } else {
      Logger.log(
        `Could not fetch Razão Social or document is not a CNPJ. Using the name provided in the form.`,
      );
    }

    EmailService.sendNotification(submissionData);

    Logger.log("Form submission processed and email sent successfully.");
  } catch (error) {
    const err = error as Error;
    Logger.log(`Error processing form submission: ${err.message}`);

    ErrorNotifier.notify(err, e);
  }
}

function onStorageMonitorTrigger(): void {
  try {
    StorageMonitor.checkCapacity();
  } catch (error) {
    const err = error as Error;
    Logger.log(`[Storage Monitor Error]: ${err.message}`);

    ErrorNotifier.notify(err, { context: "Daily Storage Monitor Trigger" });
  }
}
