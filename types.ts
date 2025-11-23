export interface MathematicianData {
  name: string;
  years: string;
  origin: string;
  bio: string;
  famousResult: string;
  impact: string;
  visualDescription: string;
  realImageUrl?: string;
}

export interface Source {
  title: string;
  uri: string;
}

export interface GeneratedContent {
  textData: MathematicianData;
  renditionUrl?: string; // AI generated image
  sources: Source[];
}