import { PrismaClient } from "@prisma/client";

// Global Definition
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

// 이 코드는 TypeScript에서 전역 변수를 선언하는 코드입니다. 이 코드는 prisma라는 전역 변수를 선언하고 있습니다.
// prisma 변수의 타입은 PrismaClient | undefined입니다. PrismaClient는 Prisma ORM을 사용하여 데이터베이스와 상호 작용하는 클라이언트 객체를 나타냅니다. | 기호는 유니온 타입을 나타내며, PrismaClient 타입 또는 undefined 타입 중 하나를 가질 수 있다는 의미입니다.
// 이 변수를 전역으로 선언함으로써 다른 모듈에서도 prisma 변수에 접근하여 데이터베이스 작업을 수행할 수 있습니다. undefined를 허용함으로써 prisma 변수가 초기화되지 않은 상태로 사용될 수도 있습니다. 이 변수는 필요한 모듈에서 초기화되어야 정상적으로 사용할 수 있습니다.
