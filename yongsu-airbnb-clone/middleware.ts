// 로그인 하지 않고 /favorites 등의 링크로 접근하는 것을 방지하기 위해
// https://stackoverflow.com/questions/76422276/module-parse-failed-identifier-nextresponse-has-already-been-declared-36-m
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
