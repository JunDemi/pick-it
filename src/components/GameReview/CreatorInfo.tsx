import React from "react";
import { ImageRankData } from "../../types/Worldcup";

function CreatorInfo (props: {
    creatorId: string;
    imgRankData: ImageRankData[];
}){
    return (     
        <div className="info-creator">
            {props.creatorId}
        </div>
    );
}

export default CreatorInfo