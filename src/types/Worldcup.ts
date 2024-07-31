export interface CreateWorldCup {
  worldcupTitle: string;
  worldcupDescription: string;
  tournamentRange: number;
  category: string[];
  pageStep: 1 | 2 | 3;
}

export interface step1DataType {
  worldCupTitle: string;
  worldcupDescription: string;
}

export interface SendData {
  userId: string;
  worldcupTitle: string;
  worldcupDescription: string;
  tournamentRange: number;
  category: string[];
  worldcupImages: {
    fileIndex: number;
    filePath: string;
    fileName: string;
  }[];
}
