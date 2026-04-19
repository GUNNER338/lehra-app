import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { APP_CONSTANTS } from '../constants/app.constants';

/**
 * Builds the FFmpeg command for changing tempo without affecting pitch.
 * 
 * @param inputPath Absolute path to source file
 * @param outputPath Absolute path to output file
 * @param tempoRatio The calculated speed factor
 * @returns Promise<void>
 */
export const buildFfmpegCommand = (
  inputPath: string,
  outputPath: string,
  tempoRatio: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioFilters(`atempo=${tempoRatio}`)
      .on('start', (commandLine) => {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('error', (err) => {
        console.error('An error occurred: ' + err.message);
        reject(err);
      })
      .on('end', () => {
        console.log('Processing finished!');
        resolve();
      })
      .save(outputPath);
  });
};
