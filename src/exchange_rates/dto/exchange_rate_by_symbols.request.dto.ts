import { IsDefined } from 'class-validator';
export class GetExchangesRateBySymbolsRequestDto {
  @IsDefined()
  fromSymbol: string;
  @IsDefined()
  toSymbol: string;
  @IsDefined()
  amount: number;
}
