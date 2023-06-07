"use client";

// Next.js는 기본적으로 SSR인데 Container 컴포넌트는 UI에만 사용되기 때문에 CSR로 전환

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
