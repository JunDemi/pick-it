import React from "react";

function DeleteUser() {
    return(
        <div className="edit-section delete-user">
            <h1>회원탈퇴</h1>
            <p>탈퇴하시면 작성하신 월드컵, 게시물, 댓글이 전부 삭제됩니다.
                <br/><br/>
                정말 PICK IT 회원을 탈퇴하시겠습니까?
            </p>
            <button>
                네. 탈퇴하겠습니다.
            </button>
        </div>
    );
}

export default DeleteUser;