import { Injectable } from '@nestjs/common';
import { Currency } from '../entities/currency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyGetInfoBySymbolResponseDto } from '../dto/currency_get_info_by_symbol.response.dto';

@Injectable()
export class CurrencyGetInfoService {
  /*
    This class contains methods for get CurrencyInfo
   */
  constructor(
    @InjectRepository(Currency)
    private exchangeRepository: Repository<Currency>,
  ) {}

  async getBySymbol(
    symbol: string,
  ): Promise<CurrencyGetInfoBySymbolResponseDto> {
    return this.exchangeRepository.findOne({ where: { symbol } });
  }
}
