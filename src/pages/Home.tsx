import React, { useEffect } from "react";
import Banner from "../components/Home/Banner/Banner";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  return (
    <section style={{ padding: "0 7rem" }}>
      <Banner />
    </section>
  );
}

export default Home;
