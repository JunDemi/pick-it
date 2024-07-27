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
