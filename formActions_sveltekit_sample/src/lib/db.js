import { PrismaClient } from '@prisma/client';

// 以下、データベースへのアクセスに必要Prisma Clientの設定
export const prisma = new PrismaClient();
