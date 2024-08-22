import React from "react";
import { MyPageDataType } from "../../types/MyPage";

function PlayedWorldcup(props: {data: MyPageDataType[]}) {
    console.log(props.data);
    return(
        <div>참여</div>
    );
}  

export default PlayedWorldcup;