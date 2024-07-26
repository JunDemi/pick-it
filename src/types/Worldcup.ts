export interface CreateWorldCup {
  worldcupTitle: string;
  worldcupName: string;
  tournamentRange: number;
  category: [];
  images: imageType[];
}

interface imageType {
  image: File;
  name: string;
}
