"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
// import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // 로그인 하지 않은 상태에서 Airbnb Your Home 클릭시 로그인 모달 출력
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open Rent Modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shoadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

// ((prevState: S) => S) 즉 이전의 state를 인자로 받고 새로운 state를 반환하는 함수를 넣을수도 있다
// https://velog.io/@devjade/React%EC%9D%98-setState-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
// useCallback: 콜백 함수 정의를 저장.
// 함수는 객체 이기 때문에 toggleOpen 변수에는 재렌더링이 발생할 때마다 같은 함수 정의라도 다른 주소값이 할당된다.
// 기능에는 변화가 없는 함수를 계속해서 재생성하는 것은 비효율적이다. useCallback 훅을 이용해서 메모제이션해둠으로써
// 재렌더링이 발생하도 useCallback 함수의 의존성 배열에 정의한 값의 변경이 없는 이상 재정의하지 않고
// 메모이제이션 해둔 것을 그대로 사용한다.
