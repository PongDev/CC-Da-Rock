import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/userRepo';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionController } from './transaction.controller';
import { HttpModule } from '@nestjs/axios';
import { TransactionService } from './transaction.service';
import { TransactionRepo } from 'src/repositories/transactionRepo';

@Module({
  imports: [HttpModule, JwtModule.register({})],
  providers: [
    UserRepository,
    PrismaService,
    TransactionService,
    TransactionRepo,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
