import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SMEs, SMEsSize, SMEsType } from 'database';
// import { InvalidRequestError } from 'src/common/error';
import { InvalidRequestError, RecordAlreadyExists } from 'src/common/error';

@Injectable()
export class SMEsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: { type: SMEsType; size: SMEsSize; id: number }) {
    return await this.prismaService.sMEs.create({
      data: {
        industry: data.type,
        size: data.size,
        userId: data.id,
      },
    });
  }

  async findByUserId(userId: number): Promise<SMEs> {
    return await this.prismaService.sMEs.findUnique({
      where: {
        userId: userId,
      },
    });
  }
}
