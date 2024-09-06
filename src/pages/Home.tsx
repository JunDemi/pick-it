import React from "react";
import Banner from "../components/Home/Banner/Banner";
import HomeSection from "../components/Home/Section/HomeSection";

function Home() {
  // const ddd = useAppSelector(
  //   (state) => state.finishWorldcupReducers.finishWorldcupReducer
  // );
  // console.log(ddd);
  return (
    <section style={{ padding: "0 7rem" }}>
      <Banner />
      <HomeSection/>
    </section>
  );
}

export default Home;
