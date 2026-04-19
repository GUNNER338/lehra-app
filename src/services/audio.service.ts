import path from 'path';
import fs from 'fs';
import { APP_CONSTANTS } from '../constants/app.constants';
import { calculateTempoRatio } from '../utils/tempo.util';
import { buildFfmpegCommand } from '../utils/ffmpeg.util';
import { config } from '../config/env.config';

export class AudioService {
  /**
   * Processes the audio file to the target BPM.
   * If the file already exists in temp, returns that.
   * 
   * @param targetBpm The desired BPM
   * @returns Promise<string> The path to the processed audio file
   */
  async getProcessedAudio(targetBpm: number): Promise<string> {
    const inputPath = path.join(config.rootPath, APP_CONSTANTS.BASE_AUDIO_PATH);
    const outputFileName = `dilruba_D#_${targetBpm}bpm.mp3`;
    const outputPath = path.join(config.rootPath, APP_CONSTANTS.PROCESSED_AUDIO_DIR, outputFileName);

    // Check if source exists
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Base audio file not found at ${inputPath}`);
    }

    // If target BPM is exactly 120 (base), return original file directly
    // This allows testing even if FFmpeg is not installed
    if (targetBpm === APP_CONSTANTS.BASE_BPM) {
      console.log('Target BPM matches base BPM, returning original sample.');
      return inputPath;
    }

    // Check if results are already cached
    if (fs.existsSync(outputPath)) {
      return outputPath;
    }

    // Ensure temp directory exists
    const tempDir = path.dirname(outputPath);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const ratio = calculateTempoRatio(APP_CONSTANTS.BASE_BPM, targetBpm);
    
    await buildFfmpegCommand(inputPath, outputPath, ratio);

    return outputPath;
  }
}

export const audioService = new AudioService();
