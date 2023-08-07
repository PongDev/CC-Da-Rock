import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleType, Transaction } from 'database';
import { PermissionError } from 'src/common/error';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { TransactionService } from './transaction.service';
import { User } from 'src/auth/user.decorator';
import {
  GetTransactionsQueryParams,
  JWTPayload,
  PurchaseSolarCoinsRequestDTO,
} from 'types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('transaction')
@Controller('transaction')
@UseFilters(AllExceptionsFilter)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment succesfully charged.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Invalid response from Payment Gateway.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('solarcoins/purchase')
  async purchaseSolarCoins(
    @User() user: JWTPayload,
    @Body() chargeData: PurchaseSolarCoinsRequestDTO,
  ): Promise<Transaction> {
    return await this.transactionService.purchaseSolarCoins({
      userId: user.userId,
      ...chargeData,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transactions successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access. Only admin can access this resource.',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getTransactions(
    @User() user: JWTPayload,
    @Query() queryParams: GetTransactionsQueryParams,
  ): Promise<{ data: Transaction[]; count: number }> {
    if (user.role !== RoleType.ADMIN) {
      throw new PermissionError('Unauthorized access.');
    }
    const {
      limit = 10,
      page = 1,
      sortBy = 'createdAt+desc',
      time,
    } = queryParams;
    return await this.transactionService.getTransactions({
      limit,
      page,
      sortBy,
      time,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transactions successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserTransactions(
    @User() user: JWTPayload,
    @Query() queryParams: GetTransactionsQueryParams,
  ): Promise<{ data: Transaction[]; count: number }> {
    console.log(queryParams);
    const {
      limit = 10,
      page = 1,
      sortBy = 'createdAt+desc',
      time,
    } = queryParams;
    return await this.transactionService.getTransactions({
      limit,
      page,
      sortBy,
      time,
      userId: user.userId,
    });
  }
}
