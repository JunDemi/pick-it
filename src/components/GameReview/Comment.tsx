import React, { useEffect, useRef, useState } from "react";
import {
  addWorldcupComment,
  getCommentUser,
  getWorldcupCommentList,
} from "../../server/firebaseComment";
import { compareTime } from "../../Utils/compareTime";

function Comments(props: { gameId: string; userId: string }) {
  //useEffect 트리거
  const [refetch, setRefetch] = useState<boolean>(true);
  //댓글 목록 저장 상태
  const [commentArray, setCommentArray] = useState<
    {
      userId: string;
      commentText: string;
      createAt: number;
    }[]
  >([]);
  //유저 닉네임 및 프로필 이미지 저장 상태
  const [commentUser, setCommentUser] = useState<
    {
      userId: string;
      nickName: string;
      profileImg: string;
    }[]
  >([]);
  //댓글 불러오기
  useEffect(() => {
    getWorldcupCommentList(props.gameId).then((result) => {
      setCommentArray(result);
      //불러온 댓글의 유저 ID를 조회하여 닉네임과 프로필 이미지 불러오기
      getCommentUser(result).then((res) => setCommentUser(res));
    });
  }, [refetch]);
  //댓글 작성칸 ref
  const commentRef = useRef<HTMLInputElement>(null);
  //댓글 작성창 초기 상태
  const [commentText, setCommentText] = useState<string>("");
  //댓글 작성 온체인지
  const commentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };
  //댓글 등록 로딩
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  //댓글 작성 핸들러
  const commentHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setCommentLoading(true);
    if (commentText.length === 0) {
      commentRef.current && commentRef.current.focus();
    } else {
      await addWorldcupComment(props.gameId, props.userId, commentText);
      if (commentRef.current) commentRef.current.value = "";
    }
    setCommentLoading(false);
    setRefetch((prev) => !prev);
  };

  //댓글 각 행의 유저 정보를 조회
  const findUserProfile = (userId: string) => {
    if (userId !== "") {
      const isExist = commentUser.find((user) => user.userId === userId);
      if (isExist) {
        return {
          nickName: isExist.nickName,
          profileImg: isExist.profileImg,
        };
      }
    } else {
      return {
        nickName: "익명",
        profileImg: "/images/user.png",
      };
    }
  };
  //댓글 정렬
  const [isDesc, setIsDesc] = useState<boolean>(true);
  //댓글 페이지네이션(더보기)
  const [commentLimit, setCommentLimit] = useState<number>(5);
  return (
    <div className="game-comment-container">
      <h1>댓글 ({commentArray.length}개)</h1>
      <table className="comment-list">
        <thead>
          <tr>
            <td colSpan={4}>
              <button onClick={() => setIsDesc(prev => !prev)}>
                날짜
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={isDesc ? "" : "rotate"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {commentArray.sort((a,b) => isDesc ? b.createAt - a.createAt : a.createAt - b.createAt).slice(0, commentLimit).map((data, index) => (
            <tr key={index}>
              <td>
                <img src={findUserProfile(data.userId)?.profileImg} alt="" />
              </td>
              <td>{findUserProfile(data.userId)?.nickName}</td>
              <td>{data.commentText}</td>
              <td>{compareTime(data.createAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {commentArray.length > commentLimit && (
        <div className="more-comments">
          <button onClick={() => setCommentLimit((prev) => prev + 5)}>
            댓글 더보기
          </button>
        </div>
      )}
      <form
        className="comment-input"
        onSubmit={(event) => commentHandler(event)}
      >
        <input
          ref={commentRef}
          type="text"
          placeholder="댓글을 작성해주세요..."
          name="commentText"
          autoComplete="off"
          onChange={commentChange}
        />
        <button type="submit" disabled={commentLoading}>
          등록
        </button>
      </form>
    </div>
  );
}

export default Comments;
