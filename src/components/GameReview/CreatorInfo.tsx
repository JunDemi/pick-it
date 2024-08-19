import React, { useEffect, useState } from "react";
import { ImageRankData } from "../../types/Worldcup";
import { getUserData } from "../../server/firebaseAuth";

function CreatorInfo(props: {
  creatorId: string;
  creatorName: string;
  imgRankData: ImageRankData[];
}) {
  const [creatorImg, setCreatorImg] = useState<string>();
  useEffect(() => {
    getUserData(props.creatorId).then((res) => setCreatorImg(res));
  }, [props.creatorId]);
  return (
    <div className="info-creator">
      <h1 className="aside-title">게임 제작자</h1>
      <div className="creator">
        <img src={creatorImg} alt="" width={200} />
        {props.creatorName}
      </div>
      <div className="buttons">
        <button className="follow">팔로우</button>
        <button className="quest">문의하기</button>
        <button className="report">신고하기</button>
      </div>
    </div>
  );
}

export default CreatorInfo;
