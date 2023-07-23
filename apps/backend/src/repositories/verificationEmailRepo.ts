import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FailedRelationConstraintError } from 'src/common/error';

@Injectable()
export class VerificationEmailRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getVerificationEmail(userId: number) {
    return await this.prismaService.verificationEmail.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async getVerificationEmailFromToken(token: string) {
    return await this.prismaService.verificationEmail.findFirst({
      where: {
        token: token,
      },
    });
  }

  // async getVerificationEmailFromEmail(email: string) {
  //   return await this.prismaService.verificationEmail.findFirst({
  //     where: {
  //       email: email
  //     },
  //   });
  // }

  async upsert(
    filter: {
      userId: number;
    },
    data: {
      email?: string;
      token?: string;
    },
  ) {
    try {
      return await this.prismaService.verificationEmail.upsert({
        where: filter,
        create: {
          token: data.token,
          userId: filter.userId,
          email: data.email,
        },
        update: data,
      });
    } catch (e) {
      if (e.code === 'P2003') {
        throw new FailedRelationConstraintError('Invalid userId');
      }
      throw e;
    }
  }
}
