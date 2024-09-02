import React, { useRef, useState } from "react";
import { addWorldcupComment } from "../../server/firebaseComment";

function Comments(props: {
    gameId: string;
    userId: string;
}) {
    const commentRef = useRef<HTMLInputElement>(null);
    //댓글 작성창 초기 상태
    const [commentText, setCommentText] = useState<string>("");
    //댓글 작성 온체인지
    const commentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    }
    //댓글 등록 로딩
    const [commentLoading, setCommentLoading] = useState<boolean>(false);
    //댓글 작성 핸들러
    const commentHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setCommentLoading(true);
        if(commentText.length === 0) {
            commentRef.current && commentRef.current.focus();
        }else{
            await addWorldcupComment(props.gameId, props.userId, commentText);
            if(commentRef.current) commentRef.current.value = '';
        }
        setCommentLoading(false);
    }
  return (
    <div className="game-comment-container">
      <h1>댓글 (5개)</h1>
      <table className="comment-list">
        <tbody>
          {[...Array(5)].map((a, b) => (
            <tr key={b}>
              <td>
                <img src="/images/user.png" alt="" />
              </td>
              <td>라일락</td>
              <td>
                마시멜로우부터 입덕한 아이유 덕으로써 월드컵 목록이 별로 없는게
                아쉽당!!
              </td>
              <td>방금 전</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="more-comments">
        <button>댓글 더보기</button>
      </div>
      <form className="comment-input" onSubmit={(event) => commentHandler(event)}>
        <input ref={commentRef} type="text" placeholder="댓글을 작성해주세요..." name="commentText" autoComplete="off" onChange={commentChange}/>
        <button type="submit" disabled={commentLoading}>등록</button>
      </form>
    </div>
  );
}

export default Comments;
