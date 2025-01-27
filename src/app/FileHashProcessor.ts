import { CheckSumType } from './CheckSumType';
import { AppFileUtils } from './utils/AppFileUtils';

export class FileHashProcessor {
  async calcHash(file: File, checkSumType: CheckSumType): Promise<string|null> {
    const fileStream = AppFileUtils.getFileStream(file);
    const hashStr = await checkSumType.calcHash(fileStream);
    if (!hashStr) {
      return Promise.resolve(null);
    }
    return hashStr;
  }
}
