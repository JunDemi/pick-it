import React from 'react';
import { getImageRankList } from '../server/firebaseWorldcup';
import { useParams } from 'react-router-dom';

function GameReview() {
  // 동적 라우팅으로 전송받은 월드컵 아이디 값 조회
  const { id: gameId } = useParams();
  getImageRankList(gameId && gameId);
  return (
   <div>
    Hello
   </div>
  );
}

export default GameReview;
