import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SolarsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async generateSolar(ccSerial: string): Promise<string[]> {
    return await this.prisma.$transaction(
      async (tx) => {
        const solar: string[] = [];
        for (let i = 0; i < 1000; i++) {
          solar.push(
            (
              await tx.solarSerial.create({
                data: {
                  ownerId: null,
                },
                select: {
                  serialID: true,
                },
              })
            ).serialID,
          );
        }
        await tx.carbonCreditSerial.create({
          data: {
            serialID: ccSerial,
          },
        });
        return solar;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  async burnSolar(): Promise<string[]> {
    try {
      return await this.prisma.$transaction(
        async (tx) => {
          let burnedSolar = await tx.solarSerial.findMany({
            where: {
              isBurned: true,
              burnedCarbonCreditSerialID: null,
            },
          });

          const ccToBurned = Math.floor(burnedSolar.length / 1000);
          if (ccToBurned === 0) {
            return [];
          }

          burnedSolar = burnedSolar.slice(0, ccToBurned * 1000);

          const availableCarbonCredit = await tx.carbonCreditSerial.findMany({
            where: {
              isBurned: false,
            },
            select: {
              serialID: true,
            },
            orderBy: {
              createdAt: 'asc',
            },
          });

          if (availableCarbonCredit.length < ccToBurned) {
            return null;
          }

          const burnedCCSerials: string[] = [];

          let burnedSolarIndex = 0;
          for (let i = 0; i < ccToBurned; i++) {
            const burnedCC = await tx.carbonCreditSerial.update({
              where: {
                serialID: availableCarbonCredit[i].serialID,
              },
              data: {
                isBurned: true,
              },
            });
            for (let j = 0; j < 1000; j++) {
              await tx.solarSerial.update({
                where: {
                  serialID: burnedSolar[burnedSolarIndex + j].serialID,
                },
                data: {
                  burnedCarbonCreditSerialID: burnedCC.serialID,
                },
              });
            }
            burnedSolarIndex += 1000;
            burnedCCSerials.push(burnedCC.serialID);
          }
          return burnedCCSerials;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (err) {
      return null;
    }
  }

  async countBurnedSolar(): Promise<number> {
    return await this.prisma.solarSerial.count({
      where: {
        isBurned: true,
      },
    });
  }
}
