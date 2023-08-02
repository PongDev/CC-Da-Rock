// import { HttpService } from "@nestjs/axios";
import { Injectable } from '@nestjs/common';
import { backendConfig } from 'config';
import { RecordNotFound, TransactionError } from 'src/common/error';
import { UserRepository } from 'src/repositories/userRepo';
import * as Omise from 'omise';
import { TransactionRepo } from 'src/repositories/transactionRepo';
import { PurchaseSolarCoinsRequestDTO } from 'types';
import { Transaction } from 'database';

@Injectable()
export class TransactionService {
  private readonly secretKey: string;
  private readonly omise: Omise.IOmise;

  constructor(
    // private readonly httpService: HttpService,
    private readonly userRepo: UserRepository,
    private readonly transactionRepo: TransactionRepo,
  ) {
    this.secretKey = backendConfig.omise.secretKey;
    this.omise = Omise({
      secretKey: this.secretKey,
    });
  }

  async purchaseSolarCoins(chargeData: PurchaseSolarCoinsRequestDTO) {
    const user = await this.userRepo.findUniqueUser({ id: chargeData.userId });
    if (!user) {
      throw new RecordNotFound('User not found.');
    }
    await this.chargeWithToken(chargeData);
    const transaction = await this.transactionRepo.createTransaction({
      amount: chargeData.amount,
      cf: chargeData.cf,
      scc: chargeData.scc,
      userId: chargeData.userId,
    });
    return transaction;
  }

  // unused
  async createCard(token: string) {
    const customer = await this.omise.customers.create({
      card: token,
    });
    console.log(customer);
    return customer.id;
  }

  async chargeWithToken(chargeData: {
    userId: number;
    amount: number;
    tokenId: string;
    description?: string;
  }): Promise<Omise.Charges.ICharge> {
    try {
      const charge = await this.omise.charges.create({
        description: chargeData.description ?? 'Charging from SolarCC',
        amount: chargeData.amount * 100, // stang
        currency: 'thb',
        capture: true,
        card: chargeData.tokenId,
        metadata: { userId: chargeData.userId },
      });
      return charge;
    } catch (err) {
      console.log(err);
      throw new TransactionError(err.message);
    }
  }

  async getTransactions(filter?: {
    userId?: number;
    time?: string;
    sortBy?: string;
    limit?: number;
    page?: number;
  }): Promise<{ data: Transaction[]; count: number }> {
    const formattedFilter = this.transactionRepo.formatFilterDefault(filter);
    return await this.transactionRepo.getTransactions(formattedFilter);
  }
}
