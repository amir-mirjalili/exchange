import { IsDefined } from 'class-validator';
export class GetExchangesRateByFiatSymbolsRequestDto {
  @IsDefined()
  fromSymbol: string;
  @IsDefined()
  toSymbol: string;
  @IsDefined()
  amount: number;
}
