import React, { useState, useRef } from "react";

function Step3Modify(props: { imageList: File[]}) {

    //파일 프리뷰 반환 함수
    const fileURL = (file: File) => {
        return URL.createObjectURL(file) as string;
    }
    //이미지 수정 테이블 페이지 번호
    const [modifyPage, setModifyPage] = useState<number>(0);

    return (
        <>
            <div className="modify-head">
                <h3>이미지 이름 수정</h3>
                <button>
                    수정 완료 및 월드컵 생성
                </button>
            </div>
            <table className="modify-section">
                <thead>
                    <tr>
                        <td>순번</td>
                        <td>이미지</td>
                        <td>이미지 이름</td>
                    </tr>
                </thead>
                <tbody>
                    {props.imageList.slice(modifyPage * 4, (modifyPage * 4) + 4).map((data, number) => (
                        <tr key={number}>
                            <td>{number + 1}</td>
                            <td>
                                <img src={fileURL(data)} alt="" />
                            </td>
                            <td>
                                <input type="text" 
                                readOnly
                                value={data.name.slice(0, data.name.indexOf("."))} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modify-paging">
                {[...Array(props.imageList.length / 4)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setModifyPage(index)}
                        className={modifyPage === index ? "get-page" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default Step3Modify;