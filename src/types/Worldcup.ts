export interface CreateWorldCup {
  worldCupTitle: string;
  worldcupDescription: string;
  tournamentRange: number;
  category: [];
  images: imageType[];
  pageStep: 1 | 2 | 3;
}

interface imageType {
  image: File;
  name: string;
}

export interface step1DataType {
  worldCupTitle: string;
  worldcupDescription: string;
}
