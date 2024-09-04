import React, { useEffect, useState } from "react";
import { MyWorldcupCommentType } from "../../types/MyPage";

function MyComment(prop: { commentData: MyWorldcupCommentType[] }) {
    console.log(prop.commentData);
  return <div></div>;
}
export default MyComment;
