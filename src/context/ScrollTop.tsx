import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  //라우터가 변경될 때마다 스크롤 탑
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 이 컴포넌트는 렌더링할 내용이 없으므로 null 반환
}

export default ScrollToTop;
