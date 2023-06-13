import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      // gte: greater than
      // +roomCount에서 +: transform this roomCount which is intially a type of string when send it into a definite number
      // roomCount 이상
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    // We're going to use a reverse filtering
    // We use these two combinations to ensure that filter out all kinds of conflicts in reservation
    if (startDate && endDate) {
      // NOT은 아래 조건을 만족하지 않는 레코드를 필터링함
      // SOME은 하위 필터링 조건 들 중 하나라도 참인 경우를 나타냄
      query.NOT = {
        // 아래 조건에 해당되는 예약을 제외한 나머지 값 결과
        // 주어진 startDate와 endDate 범위와 겹치지 않는 예약을 필터링하는 조건을 구성함.
        reservations: {
          some: {
            OR: [
              {
                // 예약 시작일이 다른 예약의 끝나는 날 혹은 그 이상인 경우
                // 예약 시작일이 다른 예약의 시작일 혹은 그 이전의 날
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              // 예약 마지막날이 다른 예약의 예약 시작일 혹은 그 이전의 날
              // 예약 마지막날이 다른 예약의 마지막 날 혹은 그 이상인 경우
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

// June13 ~ 16
