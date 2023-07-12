import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SMEsSize, SMEsType, User } from 'database';
// import { InvalidRequestError } from 'src/common/error';
import { InvalidRequestError, RecordAlreadyExists } from 'src/common/error';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // async createUserRetail(creatUserData: {
  //   name: string;
  //   tel: string;
  //   password: string;
  //   email: string;
  //   phone: string;
  // }): Promise<User> {
  //   try {
  //     return await this.prismaService.user.create({
  //       data: creatUserData,
  //     });
  //   } catch (e) {
  //     if (e.code === 'P2002') {
  //       throw new RecordAlreadyExists('Email already exists.');
  //     }
  //     throw e;
  //   }
  // }

  async createUser(creatUserData: {
    name: string;
    password: string;
    email: string;
    phone: string;
    idNumer?: string;
    size?: SMEsSize;
    type?: SMEsType;
  }): Promise<User> {
    try {
      const newUser = await this.prismaService.user.create({
        data: creatUserData,
      });
      if (creatUserData.size && creatUserData.type && newUser) {
        await this.prismaService.sMEs.create({
          data: {
            industry: creatUserData.type,
            size: creatUserData.size,
            userId: newUser.id,
          },
        });
      }
      return newUser;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new RecordAlreadyExists('Email already exists.');
      }
      throw e;
    }
  }

  async findUniqueUser(searchField: {
    userId?: number;
    email?: string;
    name?: string;
  }): Promise<User> {
    if (!searchField.email && !searchField.userId) {
      throw new InvalidRequestError('Must enter email/id.');
    }
    return await this.prismaService.user.findUnique({
      where: {
        id: searchField.userId,
        email: searchField.email,
        name: searchField.name,
      },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updateToken(id: number, token: string) {
    await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        token: token,
      },
    });
  }
}
