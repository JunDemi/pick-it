import { useEffect, useState } from "react";
import "../assets/CreateGame/createGame.scss";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import StepContainer from "../components/CreateGame/StepContainer";

const boxVar = {
  entry: {
    x: 200,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  hide: {
    x: -200,
    opacity: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function CreateGame() {
  //네비게이션
  const navigate = useNavigate();
  //로그인 상태 확인
  const isLogin: string | null = localStorage.getItem("pickit-user");

  useEffect(() => {
    if (!isLogin) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
    };
  }, [navigate, isLogin]);

  //현재 단계
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="create-game-container">
      <AnimatePresence mode="sync">
        {[1, 2, 3].map(
          (number) =>
            number === currentPage && (
              <motion.div
                className="create-game-steps-container"
                key={number}
                variants={boxVar}
                initial="entry"
                animate="center"
                exit="hide"
              >
                <StepContainer pageProp={number} />

              </motion.div>
            )
        )}
      </AnimatePresence>

      {currentPage < 3 &&
        <button onClick={() => setCurrentPage(prev => prev + 1)}>
          Clickme
        </button>
      }
    </div>
  );
}

export default CreateGame;
