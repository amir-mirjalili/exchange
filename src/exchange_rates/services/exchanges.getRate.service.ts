import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../entities/exchange_rates.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GetExchangesRateService {
  /*
    This class contains methods for get rate convention
   */
  constructor(
    @InjectRepository(ExchangeRate)
    private exchangeRepository: Repository<ExchangeRate>,
  ) {}

  /**
   * get item by symbol from currency and return the rate
   * @param symbol
   */
  async calculateBySymbols(
    fromSymbol: string,
    toSymbol: string,
    amount: number,
  ): Promise<number> {
    try {
      const exchange = await this.exchangeRepository.findOne({
        where: {
          fromCurrency: { symbol: fromSymbol },
          toCurrency: { symbol: toSymbol },
        },
      });

      if (exchange) {
        return amount * exchange.rate;
      }
      return 0;
    } catch (error) {
      console.log(error);
    }
  }
}
