import { Query, Controller, Get, BadRequestException } from '@nestjs/common';
import { GetExchangesRateService } from '../services/exchanges.getRate.service';
import { GetExchangesRateBySymbolsRequestDto } from '../dto/exchange_rate_by_symbols.request.dto';

@Controller('api/exchange-rate')
export class ExchangeRateController {
  constructor(
    private readonly getExchangeRateService: GetExchangesRateService,
  ) {}
  @Get('irr')
  async calculateIRR(@Query('amount') amount: number): Promise<number> {
    if (!amount) throw new BadRequestException('Amount is required');
    const response = await this.getExchangeRateService.calculateBySymbols(
      'IRR',
      'USD',
      amount,
    );
    return response;
  }

  @Get('fiat')
  async calculateFiat(
    @Query() query: GetExchangesRateBySymbolsRequestDto,
  ): Promise<number> {
    if (query.toSymbol === 'IRR' || query.fromSymbol === 'IRR')
      throw new BadRequestException('the symbol is not correct');
    const response = await this.getExchangeRateService.calculateFiatBySymbols(
      query.fromSymbol,
      query.toSymbol,
      query.amount,
    );
    return response;
  }

  @Get('crypto')
  async calculateCrypto(
    @Query() query: GetExchangesRateBySymbolsRequestDto,
  ): Promise<number> {
    const response = await this.getExchangeRateService.calculateCryptoBySymbols(
      query.fromSymbol,
      query.toSymbol,
      query.amount,
    );
    return response;
  }
}
