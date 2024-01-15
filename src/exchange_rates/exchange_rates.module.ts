import { Module } from '@nestjs/common';
import { ExchangeRateController } from './controllers/exchange_rate.controller';
import { GetExchangesRateService } from './services/exchanges.getRate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from './entities/exchange_rates.entity';

@Module({
  controllers: [ExchangeRateController],
  providers: [GetExchangesRateService],
  imports: [TypeOrmModule.forFeature([ExchangeRate])],
})
export class ExchangeRatesModule {}
