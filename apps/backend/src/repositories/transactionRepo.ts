import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Transaction } from 'database';

@Injectable()
export class TransactionRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async createTransaction(data: {
    userId: number;
    cf: number;
    scc: number;
    amount: number; // thb
    // transactionType: TransactionType
  }) {
    return await this.prismaService.transaction.create({
      data: {
        userId: data.userId,
        cf: data.cf,
        scc: data.scc,
        amount: data.amount,
        // transactionType: data.transactionType,
      },
    });
  }

  async getTransactions(filter?: {
    where?: { [key: string]: any };
    orderBy?: { [key: string]: any };
    take?: number;
    skip?: number;
  }): Promise<{ data: Transaction[]; count: number }> {
    const result = await this.prismaService.$transaction([
      this.prismaService.transaction.findMany(filter),
      this.prismaService.transaction.count({ where: filter.where }),
    ]);
    return { data: result[0], count: result[1] };
  }

  formatFilterDefault(filter: {
    userId?: number;
    time?: string;
    sortBy?: string;
    limit?: number;
    page?: number;
  }) {
    const formattedFilter: {
      where?: { [key: string]: any };
      orderBy?: { [key: string]: any };
      take?: number;
      skip?: number;
    } = { where: {}, orderBy: {} };
    switch (filter.sortBy) {
      case 'createdAt+desc':
        formattedFilter.orderBy = { createdAt: 'desc' };
        break;
      case 'createdAt+asc':
        formattedFilter.orderBy = { createdAt: 'asc' };
        break;
      case 'amount+desc':
        formattedFilter.orderBy = { amount: 'desc' };
        break;
      case 'amount+asc':
        formattedFilter.orderBy = { amount: 'asc' };
        break;
      default:
        formattedFilter.orderBy = { createdAt: 'desc' };
        break;
    }
    const timeScopeArray = filter?.time?.split('-');
    if (timeScopeArray && timeScopeArray.length === 1) {
      const year = this.getYear(timeScopeArray[0]);
      formattedFilter.where.createdAt = {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      };
    } else if (timeScopeArray && timeScopeArray.length === 2) {
      const year = this.getYear(timeScopeArray[0]);
      formattedFilter.where.createdAt = this.getMonthCondition(
        timeScopeArray[1],
        year,
      );
    }
    formattedFilter.take = filter.limit;
    formattedFilter.skip = (filter.page - 1) * filter.limit;
    formattedFilter['where']['userId'] = filter.userId;
    return formattedFilter;
  }

  getYear(yearString: string) {
    return isNaN(parseInt(yearString))
      ? new Date().getFullYear()
      : parseInt(yearString);
  }

  getMonthCondition(month, year) {
    if (isNaN(parseInt(month)) || parseInt(month) < 1 || parseInt(month) > 12) {
      return {
        gte: `${year}-01-01`,
        lte: `${year}-12-31`,
      };
    }
    const month30 = ['4', '6', '9', '11'];
    const leapYear =
      (parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) ||
      parseInt(year) % 400 === 0
        ? true
        : false;
    const days = month30.includes(month)
      ? 30
      : month !== '2'
      ? 31
      : leapYear
      ? 29
      : 28;
    const startMonthDate = `${year}-${month.padStart(2, '0')}-01`;
    const endMonthDate = `${year}-${month.padStart(2, '0')}-${days}`;
    return {
      gte: new Date(startMonthDate),
      lte: new Date(endMonthDate),
    };
  }
}
