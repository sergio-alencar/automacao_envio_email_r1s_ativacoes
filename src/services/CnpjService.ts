// src\CnpjService.ts

class CnpjService {
  private static readonly API_URL = "https://brasilapi.com.br/api/cnpj/v1/";

  static getRazaoSocial(cnpj: string): string | null {
    const cleanCnpj = cnpj.replace(/\D/g, "");

    if (cleanCnpj.length !== 14) {
      return null;
    }

    try {
      const response = UrlFetchApp.fetch(`${this.API_URL}${cleanCnpj}`, {
        method: "get",
        muteHttpExceptions: true,
      });

      if (response.getResponseCode() === 200) {
        const data = JSON.parse(response.getContentText());
        return data.razao_social || null;
      } else {
        Logger.log(
          `[CnpjService] Failed to fetch CNPJ ${cleanCnpj}. Status: ${response.getResponseCode()}`,
        );
        return null;
      }
    } catch (error) {
      Logger.log(
        `[CnpjService] Exception fetching CNPJ ${cleanCnpj}: ${(error as Error).message}`,
      );
      return null;
    }
  }
}
