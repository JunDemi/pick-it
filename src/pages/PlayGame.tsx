import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findSelectWorldcup } from "../server/firebaseWorldcup";
import "../assets/Contents/playGame.scss";
import { AnimatePresence, motion } from "framer-motion";

function PlayGame() {
  //로컬스토리지 값을 동적으로 저장하는 상태
  const [data, setData] = useState<string>(() => {
    return localStorage.getItem("game-data") || "";
  });

  //토너먼트 전체 범위 상태
  const [range, setRange] = useState<8 | 16 | 32 | 64 | 128>(8);
  //토너먼트 및 로딩UI 상태
  const [tournamentPopup, setTournamentPopup] = useState<boolean>(true);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  //게임 카드 '선택하기' 클릭 시 오버레이를 위한 레이아웃 할당
  const [selectCard, setSelectCard] = useState<string>("");

  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id: gameId } = useParams();

  // 월드컵 아이디 값을 파라미터로 넘겨 선택 월드컵 데이터 fetch
  const fetchIdWorldcup = async () => {
    if (gameId) {
      const res = await findSelectWorldcup(gameId);
      return res;
    }
  };

  // fetch로 받은 게임 데이터들을 조합하여 로컬스토리지에 셋업
  const setGameData = (
    gameId: string,
    gameTitle: string,
    gameImage: {
      fileIndex: number;
      fileName: string;
      filePath: string;
    }[],
    limit: number
  ) => {
    //1단계. 이미지 배열 랜덤 배치 후 limit만큼 slice
    const slicedImage = gameImage
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
    //2단계. 매개변수 gameId와 상수 slicedImage를 로컬스토리지에 셋업
    setData(
      JSON.stringify({
        GameId: gameId,
        GameTitle: gameTitle,
        GameImage: slicedImage,
        GameRange: limit,
      })
    );
  };

  //토너먼트 범주 선택 후 데이터 불러오기
  const startGame = async (limit: number) => {
    setTournamentPopup(false);
    await fetchIdWorldcup().then(
      //반환된 promise를 로컬스토리지에 저장하는 과정
      (res) =>
        res &&
        setGameData(
          res.gameId,
          res.gameInfo.worldcupTitle,
          res.gameInfo.worldcupImages,
          limit
        )
    );
    //1초의 지연 시간 후 게임 데이터가 UI에 띄워지도록
    setTimeout(() => {
      setFetchLoading(false);
    }, 1000);
  };

  //state값이 변경될 때마다 로컬스토리지 업데이트
  useEffect(() => {
    localStorage.setItem("game-data", data);
    fetchIdWorldcup().then(
      (res) => res && setRange(res.gameInfo.tournamentRange)
    ); //토너먼트 전체 범위 따로 상태 저장
  }, [data]);

  //새로고침 초기화 방지를 위한 훅
  useEffect(() => {
    if (gameId && data) {
      //게임 페이지 입장 + 기존에 저장된 게임로컬스토리지가 존재할 때
      if (gameId === JSON.parse(data).GameId) {
        //현재 페이지의 Id와 로컬스토리지 게임의 Id가 동일하면 팝업과 로딩 삭제 및 로컬스토리지 유지
        setTournamentPopup(false);
        setFetchLoading(false);
      } else {
        //새로운 게임 페이지 일 경우 로컬스토리지 삭제
        localStorage.removeItem("game-data");
      }
    }
  }, [gameId]);

  //카드 선택 후 다음 게임으로
  const nextGame = (parseData: {
    GameId: string;
    GameTitle: string;
    GameImage: {
      fileIndex: number;
      fileName: string;
      filePath: string;
    }[];
    GameRange: number;
  }) => {
    const deletePrevImage = parseData.GameImage.slice(2) //0번째와 1번째 인덱스 제거
    let nextRound = parseData.GameRange;
    if(nextRound / 2 === deletePrevImage.length) { //다음 라운드로 넘어갈지
      nextRound = nextRound / 2; //다음 라운드로
    }
    //로컬스토리지 데이터 기반 state변경
    setData(
      JSON.stringify({
        GameId: parseData.GameId,
        GameTitle: parseData.GameTitle,
        GameImage: deletePrevImage,
        GameRange: nextRound,
      })
    );
    //오버레이 닫기
    setSelectCard("");
  };

  return fetchLoading ? (
    <>
      <div className="before-game-message">
        <h2>게임을 불러오는 중입니다...</h2>
        <div className="loading-spiner">
          <hr />
          <div />
        </div>
      </div>
      <AnimatePresence>
        {tournamentPopup && (
          <motion.div
            className="tournament-select-popup"
            initial={{ opacity: 0 }}
            animate={tournamentPopup ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <h2>라운드를 선택해주세요.</h2>
            <div className="select-buttons">
              {range > 128 && (
                <button onClick={() => startGame(range / 64)}>
                  {range / 64}강
                </button>
              )}
              {range > 64 && (
                <button onClick={() => startGame(range / 32)}>
                  {range / 32}강
                </button>
              )}
              {range > 32 && (
                <button onClick={() => startGame(range / 16)}>
                  {range / 16}강
                </button>
              )}
              {range > 16 && (
                <button onClick={() => startGame(range / 8)}>
                  {range / 8}강
                </button>
              )}
              {range > 8 && (
                <button onClick={() => startGame(range / 4)}>
                  {range / 4}강
                </button>
              )}
              <button onClick={() => startGame(range / 2)}>
                {range / 2}강
              </button>
              <button onClick={() => startGame(range)}>{range}강</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ) : (
    <>
      <section className="game-container">
        <div className="game-title">
          <span>{JSON.parse(data).GameRange === 2 ? "결승" : JSON.parse(data).GameRange + "강"}</span>
          <h1>{JSON.parse(data).GameTitle}</h1>
        </div>
        <AnimatePresence>
          <div className="game-section">
            {JSON.parse(data)
              .GameImage.slice(0, 2)
              .map(
                (
                  items: {
                    fileIndex: number;
                    fileName: string;
                    filePath: string;
                  },
                  index: number
                ) => (
                  <div className="game-card" key={items.fileIndex}>
                    <motion.img
                      src={items.filePath}
                      alt=""
                      layoutId={String(index)}
                    />
                    <p>{items.fileName}</p>
                    <button
                      className={`btnBg${index}`}
                      onClick={() => setSelectCard(String(index))}
                    >
                      선택하기
                    </button>
                  </div>
                )
              )}
          </div>
        </AnimatePresence>
      </section>
      <AnimatePresence>
        {selectCard !== "" && (
          <motion.div
            className="card-selected"
            initial={{ opacity: 0 }}
            animate={selectCard !== "" ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={JSON.parse(data).GameImage[Number(selectCard)].filePath}
              alt=""
              layoutId={selectCard}
            />
            <h1>
              {JSON.parse(data).GameImage[Number(selectCard)].fileName}{" "}
              {JSON.parse(data).GameRange / 2 === 2
                ? "결승 "
                : JSON.parse(data).GameRange / 2 + "강 "}
              진출
            </h1>
            <button onClick={() => nextGame(JSON.parse(data))}>다음</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PlayGame;