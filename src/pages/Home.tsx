import React from "react";
import Banner from "../components/Home/Banner/Banner";
import { useAppSelector } from "../hooks/redux";

function Home() {
  const ddd = useAppSelector(
    (state) => state.finishWorldcupReducers.finishWorldcupReducer
  );
  console.log(ddd);
  return (
    <section style={{ padding: "0 7rem" }}>
      <Banner />
    </section>
  );
}

export default Home;
