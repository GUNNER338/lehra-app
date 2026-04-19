export interface TempoRequestBody {
  bpm: number;
}

export interface AudioProcessingResponse {
  filePath: string;
  fileName: string;
  mimeType: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
}
