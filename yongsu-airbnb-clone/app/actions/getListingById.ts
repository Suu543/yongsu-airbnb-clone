import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      // 사용자 profile 등을 같이 로딩하기 위해서
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

// "I"를 붙여 인터페이스 이름을 정의하는 것은 TypeScript의 네이밍 컨벤션 중 하나입니다. 이는 개발자들 간의 일관성을 유지하고 코드 가독성을 향상시키기 위한 관례입니다.
// "I"는 인터페이스를 나타내는 식별자로 사용됩니다. 예를 들어, "IParams"라는 인터페이스는 Params라는 개념을 나타내는 것입니다. 이러한 네이밍 컨벤션은 코드를 읽거나 유지보수하는 동안 인터페이스를 쉽게 식별하고 구분할 수 있도록 도와줍니다.
// TypeScript에서는 인터페이스의 이름을 정의할 때 "I"를 사용하지 않아도 되지만, 일반적으로 인터페이스를 식별하기 위해 "I"를 접두사로 사용하는 것이 일반적인 관례입니다. 그러므로 "IParams"와 같이 "I" 접두사를 사용하여 인터페이스를 정의하면 다른 개발자들도 더 쉽게 인터페이스를 식별하고 사용할 수 있습니다.
// 단, 네이밍 컨벤션은 개인 또는 팀의 기호에 따라 다를 수 있습니다. 중요한 것은 일관성을 유지하고 코드베이스 전체에서 동일한 네이밍 스타일을 사용하는 것입니다.
