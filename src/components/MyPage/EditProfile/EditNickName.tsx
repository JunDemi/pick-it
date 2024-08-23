import React from "react";

function EditNickName() {
    return(
        <div className="edit-section edit-info">
            <h1>닉네임 변경하기</h1>
            <table>
                <tbody>
                    <tr>
                        <td>현재 닉네임</td>
                        <td><input type="text" readOnly className="readonly-text"/></td>
                    </tr>
                    <tr>
                        <td>변경할 닉네임</td>
                        <td><input type="text" className="change-text"/></td>
                    </tr>
                </tbody>
            </table>
            <button>
                변경하기
            </button>
        </div>
    );
}

export default EditNickName;