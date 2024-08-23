import React from "react";

function EditPassword() {
    return(
        <div className="edit-section edit-info">
            <h1>비밀번호 변경하기</h1>
            <table>
                <tbody>
                    <tr>
                        <td>현재 비밀번호</td>
                        <td><input type="text" className="change-text"/></td>
                    </tr>
                    <tr>
                        <td>변경할 비밀번호</td>
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

export default EditPassword;