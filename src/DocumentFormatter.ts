// src\DocumentFormatter.ts

class DocumentFormatter {
  private static readonly NON_DIGIT_REGEX = /\D/g;
  private static readonly CPF_MASK_REGEX = /(\d{3})(\d{3})(\d{3})(\d{2})/;
  private static readonly CNPJ_MASK_REGEX =
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;

  static formatCpfCnpj(document: string): string {
    const cleaned = document.replace(this.NON_DIGIT_REGEX, "");

    if (cleaned.length === 11) {
      return cleaned.replace(this.CPF_MASK_REGEX, "$1.$2.$3-$4");
    }

    if (cleaned.length === 14) {
      return cleaned.replace(this.CNPJ_MASK_REGEX, "$1.$2.$3/$4-$5");
    }

    return document;
  }
}
