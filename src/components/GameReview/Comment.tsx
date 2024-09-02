import React from "react";

function Comments() {
  return (
    <div className="game-comment-container">
      <h1>댓글</h1>
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
      <form className="comment-input">
        <input type="text" placeholder="댓글을 작성해주세요..." />
        <button>등록</button>
      </form>
    </div>
  );
}

export default Comments;
