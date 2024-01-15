export class CurrencyGetInfoBySymbolResponseDto {
  id: number;
  symbol: string;
  name: string;
  type: string;
  constructor(id: number, symbol: string, name: string, type: string) {
    this.id = id;
    this.symbol = symbol;
    this.name = name;
    this.type = type;
  }
}
