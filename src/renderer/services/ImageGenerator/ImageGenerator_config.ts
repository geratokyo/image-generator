export interface ImageGeneratorConfig {
  width: number;
  height: number;
  description: string;
  baseImageUri: string;
  editionSize: number;
  startEditionFrom: number;
  endEditionAt: number;
  races?: any[];
  dir: string;
  raceWeights: IRaceWeights[];
  outputDir?: string;
}

export interface IRaceWeights {
  value: string;
  from: number;
  to: number;
}
