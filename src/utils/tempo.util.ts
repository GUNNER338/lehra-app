import { APP_CONSTANTS } from '../constants/app.constants';

/**
 * Calculates the tempo ratio for FFmpeg atempo filter.
 * atempo filter accepts values between 0.5 and 2.0.
 * 
 * @param baseBpm The BPM of the original audio file
 * @param targetBpm The desired BPM
 * @returns number
 */
export const calculateTempoRatio = (baseBpm: number, targetBpm: number): number => {
  const ratio = targetBpm / baseBpm;
  // FFmpeg atempo filter is limited to [0.5, 2.0]
  // If we need more, we'd need to chain filters, but for 60-200 BPM of 120, it's 0.5-1.66
  return Math.min(Math.max(ratio, 0.5), 2.0);
};
