import { Query, Controller, Get, BadRequestException } from '@nestjs/common';
import { GetExchangesRateService } from '../services/exchanges.getRate.service';

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
}
