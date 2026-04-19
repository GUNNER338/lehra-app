export const APP_CONSTANTS = {
  MIN_BPM: 70,
  MAX_BPM: 200,
  BASE_BPM: 120, // Based on the filename "Bpm120"
  BASE_AUDIO_PATH: 'assets/audio/dilruba_D#.mp3',
  PROCESSED_AUDIO_DIR: 'temp/processed',
  PORT: process.env.PORT || 3000,
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
