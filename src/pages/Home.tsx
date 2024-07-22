import React, { useContext, useEffect } from "react";
import Banner from "../components/Home/Banner/Banner";
import { PopupContext } from "../context/PopupContext";

function Home() {
  const { setUserPopupToggle } = PopupContext();
  /* 로그아웃 후 메인 페이지로 강제 navigate 될때, userPopup toggle 상태값 false로 팝업창 종료*/
  useEffect(() => {
    if (setUserPopupToggle) {
      setUserPopupToggle(false);
    }
  }, []);
  return (
    <section style={{ padding: "0 7rem" }}>
      <Banner />
    </section>
  );
}

export default Home;
