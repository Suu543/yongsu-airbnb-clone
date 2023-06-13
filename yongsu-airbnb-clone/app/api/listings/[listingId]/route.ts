import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // The reason I am using deleteMany not deleteOne is because we cannot pass this userId, we cannot query multiple where inside the deleteMany
  // I only want the currentUser who owns this listing which we can check by comparing with userId to be able to delete this listing
  // deleteOne은 단일 조건에 해당하는 첫 번째 레코드를 삭제하고, deleteMany는 여러 조건을 수용하고 해당하는 모든 레코드를 삭제합니다. 사용할 메서드는 작업의 목적과 조건에 따라 다르게 선택해야 합니다.
  // delete deletes an existing database record. You can delete a record:
  // To delete records that match a certain criteria, use deleteMany with a filter.
  // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#delete

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
