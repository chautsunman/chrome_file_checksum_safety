import { CheckSumType } from './CheckSumType';
import { AppFileUtils } from './utils/AppFileUtils';

export class FileHashProcessor {
  async calcHash(file: File, checkSumType: CheckSumType, chunkSize: number): Promise<string|null> {
    const checkSumCalculator = checkSumType.createCalculator();
    const fileStream = AppFileUtils.getFileStream(file, chunkSize);
    for await (const buffer of fileStream) {
      checkSumCalculator.update(buffer);
    }
    const hashStr = checkSumCalculator.calc();
    if (!hashStr) {
      return Promise.resolve(null);
    }
    return hashStr;
  }
}
