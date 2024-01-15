// exchange-rate.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Currency } from '../../currencies/entities/currency.entity';

@Entity()
export class ExchangeRate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Currency, { eager: true })
  @JoinColumn({ name: 'from_currency_id' })
  fromCurrency: Currency;

  @ManyToOne(() => Currency, { eager: true })
  @JoinColumn({ name: 'to_currency_id' })
  toCurrency: Currency;

  @Column({ type: 'float' })
  rate: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
