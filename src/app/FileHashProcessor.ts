import { CheckSumType } from './CheckSumType';
import { AppUtils } from './AppUtils';

export class FileHashProcessor {
  async calcHash(file: File, checkSumType: CheckSumType): Promise<string|null> {
    const fileArrayBuffer = await file.arrayBuffer();
    const hashArrayBuffer = await checkSumType.calcHash(fileArrayBuffer);
    if (!hashArrayBuffer) {
      return Promise.resolve(null);
    }
    return AppUtils.getHexFromArrayBuffer(hashArrayBuffer);
  }
}
