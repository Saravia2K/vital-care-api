import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Return list of prisma model fields removing those specified in omit param
   *
   * @param model Prisma model
   * @param omit Array of properties for model to omit
   */
  prismaExclude<T extends Entity, K extends Keys<T>>(model: T, omit: K[]) {
    type Key = Exclude<Keys<T>, K>;
    type TMap = Record<Key, true>;
    const result: TMap = {} as TMap;
    for (const key in Prisma[`${model}ScalarFieldEnum`]) {
      if (!omit.includes(key as K)) {
        result[key as Key] = true;
      }
    }
    return result;
  }
}

/**
 * Exclude
 */
type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;
