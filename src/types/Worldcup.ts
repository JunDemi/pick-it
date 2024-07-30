export interface CreateWorldCup {
  worldCupTitle: string;
  worldcupDescription: string;
  tournamentRange: number;
  category: string[];
  pageStep: 1 | 2 | 3;
}

export interface step1DataType {
  worldCupTitle: string;
  worldcupDescription: string;
}
export interface CreateGame {
  userId: string;
  worldCupTitle: string;
  worldcupDescription: string;
  tournamentRange: number;
  category: string[];
  images: GameImages[];
}
interface GameImages {
  index: number;
  name: string;
  file: File
}