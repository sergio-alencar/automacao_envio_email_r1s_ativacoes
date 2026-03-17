class DocumentFormatter {
  private static readonly NON_DIGIT_REGEX = /\D/g;
  private static readonly CPF_MASK_REGEX = /(\d{3})(\d{3})(\d{3})(\d{2})/;
  private static readonly CNPJ_MASK_REGEX = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;

  private static readonly CPF_LENGTH = 11;
  private static readonly CNPJ_LENGTH = 14;

  static formatCpfCnpj(document: string): string {
    const cleaned = document.replace(this.NON_DIGIT_REGEX, "");

    if (cleaned.length === this.CPF_LENGTH) {
      return cleaned.replace(this.CPF_MASK_REGEX, "$1.$2.$3-$4");
    }

    if (cleaned.length === this.CNPJ_LENGTH) {
      return cleaned.replace(this.CNPJ_MASK_REGEX, "$1.$2.$3/$4-$5");
    }

    return document;
  }
}
