// src\DateFormatter.ts

class DateFormatter {
  private static readonly BR_DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;
  private static readonly ISO_DATE_REGEX = /^(\d{4})[-\/](\d{2})[-\/](\d{2})/;

  static formatToBR(dateString: string): string {
    if (!dateString) {
      return "N/A";
    }

    if (this.BR_DATE_REGEX.test(dateString)) {
      return dateString;
    }

    const isoMatch = dateString.match(this.ISO_DATE_REGEX);
    if (isoMatch) {
      return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
    }

    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
      const day = String(parsedDate.getDate()).padStart(2, "0");
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const year = parsedDate.getFullYear();

      return `${day}/${month}/${year}`;
    }

    return dateString;
  }
}
