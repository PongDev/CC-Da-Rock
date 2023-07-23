import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleType, SMEsSize, SMEsType, User } from 'database';
// import { InvalidRequestError } from 'src/common/error';
import { InvalidRequestError, RecordAlreadyExists } from 'src/common/error';

@Injectable()
export class UserRepository {
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

  async registerUserWithoutEmail(creatUserData: {
    name: string;
    password: string;
    email: string;
    phone: string;
    idNumer?: string;
    size?: SMEsSize;
    type?: SMEsType;
  }): Promise<User> {
    try {
      const existedEmail = await this.findUniqueUser({
        email: creatUserData.email,
      });
      if (existedEmail) {
        throw new RecordAlreadyExists('Email has already been used.');
      }
      const { email, ...creatUserDataWithoutEmail } = creatUserData;
      const newUser = await this.prismaService.user.create({
        data: creatUserDataWithoutEmail,
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
        throw new RecordAlreadyExists('Email or name already exists.');
      }
      throw e;
    }
  }

  async findUniqueUser(searchField: {
    id?: number;
    name?: string;
    email?: string;
  }): Promise<User> {
    if (!searchField.id && !searchField.email && searchField.name) {
      throw new InvalidRequestError('Must enter id, name or email.');
    }
    return await this.prismaService.user.findUnique({
      where: searchField,
    });
  }

  async find(
    searchField: {
      id?: number;
      name?: string;
      email?: string;
      phone?: string;
      emailVerified?: boolean;
      role?: RoleType;
      idNumber?: string;
      token?: string;
    },
    option?,
  ) {
    return await this.prismaService.user.findMany({
      where: searchField,
      ...option,
    });
  }

  async findFirst(searchField: {
    id?: number;
    email?: string;
    emailVerified?: boolean;
  }) {
    return await this.prismaService.user.findFirst({
      where: searchField,
    });
  }

  async updateUser(
    id: number,
    data: {
      id?: number;
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
      emailVerified?: boolean;
      role?: RoleType;
      idNumber?: string;
      token?: string;
    },
  ) {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async deleteUser(id: number) {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
