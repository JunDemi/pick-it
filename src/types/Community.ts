import { WorldcupImage } from "./Worldcup";

export interface ICommiunity {
        communityId: string;
        gameId: string;
        userId: string;
        userProfile: string;
        userName: string;
        communityTitle: string;
        communitySubTitle: string;
        firstImg: WorldcupImage;
        secondImg: WorldcupImage;
        heart: string[];
        createAt: number;
        updateAt: number;
}