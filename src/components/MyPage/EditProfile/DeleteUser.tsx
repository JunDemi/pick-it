import React from "react";
import { deleteWorldcup } from "../../../server/firebaseMyPage";
import { deleteMyProfile } from "../../../server/firebaseAuth";

function DeleteUser(prop: { userId: string }) {

    //회원 탈퇴 핸들러
    const deleteHandler = async() => {
        //월드컵, 댓글, sns삭제 후 계정 삭제
        await deleteWorldcup(prop.userId)
        .then(() => deleteMyProfile(prop.userId));
    }
    return(
        <div className="edit-section delete-user">
            <h1>회원탈퇴</h1>
            <p>탈퇴하시면 작성하신 월드컵, 게시물, 댓글이 전부 삭제됩니다.
                <br/><br/>
                정말 PICKIT 회원을 탈퇴하시겠습니까?
            </p>
            <button onClick={deleteHandler}>
                네. 탈퇴하겠습니다.
            </button>
        </div>
    );
}

export default DeleteUser;