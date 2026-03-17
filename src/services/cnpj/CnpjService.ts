class CnpjService {
  private static readonly API_URL = "https://brasilapi.com.br/api/cnpj/v1/";
  private static readonly CNPJ_LENGTH = 14;
  private static readonly HTTP_STATUS_OK = 200;
  private static readonly HTTP_METHOD_GET = "get";
  private static readonly NON_DIGIT_REGEX = /\D/g;

  static getRazaoSocial(cnpj: string): string | null {
    const cleanCnpj = this.sanitizeCnpj(cnpj);

    if (cleanCnpj.length !== this.CNPJ_LENGTH) {
      return null;
    }

    return this.fetchRazaoSocial(cleanCnpj);
  }

  private static sanitizeCnpj(cnpj: string): string {
    return cnpj.replace(this.NON_DIGIT_REGEX, "");
  }

  private static fetchRazaoSocial(cleanCnpj: string): string | null {
    try {
      const response = UrlFetchApp.fetch(`${this.API_URL}${cleanCnpj}`, {
        method: this.HTTP_METHOD_GET,
        muteHttpExceptions: true,
      });

      if (response.getResponseCode() === this.HTTP_STATUS_OK) {
        const data = JSON.parse(response.getContentText());
        return data.razao_social || null;
      }

      Logger.log(
        `[CnpjService] Failed to fetch ${cleanCnpj}. Status: ${response.getResponseCode()}`,
      );
      return null;
    } catch (error) {
      Logger.log(
        `[CnpjService] Exception while fetching CNPJ ${cleanCnpj}: ${(error as Error).message}`,
      );
      return null;
    }
  }
}
