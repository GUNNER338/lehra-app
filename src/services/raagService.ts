import { raags } from '../data/raagData';
import { RaagData } from '../types';

export class RaagService {
  static getRaagByName(name: string): RaagData | null {
    return raags[name.toLowerCase()] || null;
  }

  static getAllRaags(): string[] {
    return Object.keys(raags);
  }
}
