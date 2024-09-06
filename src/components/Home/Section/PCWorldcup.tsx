import React, { useState } from "react";

function PCWorldcup() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const clickSlide = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentPage((prev) =>
        prev === 0 ? testData.length / 5 - 1 : prev - 1
      );
    } else {
      setCurrentPage((prev) =>
        prev === testData.length / 5 - 1 ? 0 : prev + 1
      );
    }
  };
  return (
    <>
      <div className="pop-worldcup-slide-container">
        {[...Array(testData.length / 5)].map(
          (_, i) =>
            i === currentPage && (
              <div key={i} className="slide-wrapper">
                {testData
                  .slice(currentPage * 5, currentPage * 5 + 5)
                  .map((data, d) => (
                    <div key={d} className="item">
                      {data.name}
                    </div>
                  ))}
              </div>
            )
        )}
      </div>
      <button onClick={() => clickSlide("prev")}>이전 슬라이드</button>
      <button onClick={() => clickSlide("next")}>다음 슬라이드</button>
    </>
  );
}

export default PCWorldcup;

const testData = [
  {
    id: 1,
    name: "item1",
  },
  {
    id: 2,
    name: "item2",
  },
  {
    id: 3,
    name: "item3",
  },
  {
    id: 4,
    name: "item4",
  },
  {
    id: 5,
    name: "item5",
  },
  {
    id: 6,
    name: "item6",
  },
  {
    id: 7,
    name: "item7",
  },
  {
    id: 8,
    name: "item8",
  },
  {
    id: 9,
    name: "item9",
  },
  {
    id: 10,
    name: "item10",
  },
  {
    id: 11,
    name: "item11",
  },
  {
    id: 12,
    name: "item12",
  },
  {
    id: 13,
    name: "item13",
  },
  {
    id: 14,
    name: "item14",
  },
  {
    id: 15,
    name: "item15",
  },
  {
    id: 16,
    name: "item16",
  },
  {
    id: 17,
    name: "item17",
  },
  {
    id: 18,
    name: "item18",
  },
  {
    id: 19,
    name: "item19",
  },
  {
    id: 20,
    name: "item20",
  },
];
