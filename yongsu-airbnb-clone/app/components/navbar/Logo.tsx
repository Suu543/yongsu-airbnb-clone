"use client";

import Image from "next/image";
// CSR이기 때문에 next/navigation에서 import
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  // 로고를 클릭하면 카테고리가 리셋됩니다.
  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height="100"
      width="100"
      src="/images/logo.png"
    />
  );
};

export default Logo;
