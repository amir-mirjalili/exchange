import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { GetExchangesRateService } from './exchanges.getRate.service';
import { ExchangeRate } from '../entities/exchange_rates.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GetExchangesRateService', () => {
  let service: GetExchangesRateService;
  let exchangeRepository: Repository<ExchangeRate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetExchangesRateService,
        {
          provide: getRepositoryToken(ExchangeRate),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GetExchangesRateService>(GetExchangesRateService);
    exchangeRepository = module.get<Repository<ExchangeRate>>(
      getRepositoryToken(ExchangeRate),
    );

    const mockExchange: ExchangeRate = {
      id: 1,
      fromCurrency: {
        id: 1,
        symbol: 'USD',
        name: 'USD',
        type: 'Fiat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      toCurrency: {
        id: 2,
        symbol: 'EUR',
        name: 'EUR',
        type: 'Fiat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      rate: 1.2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(exchangeRepository, 'findOne')
      .mockImplementation(async () => mockExchange);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateBySymbols', () => {
    it('should calculate exchanges rate correctly when exchange exists', async () => {
      const result = await service.calculateBySymbols('USD', 'EUR', 100);

      expect(result).toEqual(120); // 100 * 1.2
    });

    it('should return 0 when exchange does not exist', async () => {
      jest
        .spyOn(exchangeRepository, 'findOne')
        .mockImplementation(async () => undefined);

      const result = await service.calculateBySymbols('USD', 'EUR', 100);

      expect(result).toEqual(0);
    });

    it('should catch errors and log them', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      jest.spyOn(exchangeRepository, 'findOne').mockRejectedValue('Test error');

      await service.calculateBySymbols('USD', 'EUR', 100);

      expect(consoleSpy).toHaveBeenCalledWith('Test error');
    });

    it('should calculate fiat exchange rate', async () => {
      const result = await service.calculateFiatBySymbols('USD', 'EUR', 100);

      expect(result).toBe(120); // 100 * 1.2
    });
  });
});
