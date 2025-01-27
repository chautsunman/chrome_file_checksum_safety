import { algo, lib, enc } from 'crypto-js';

import { CheckSumType } from '../CheckSumType';

export class Md5CheckSum implements CheckSumType {
  private static INSTANCE: Md5CheckSum = new Md5CheckSum();
  private static ID = 'MD5';

  private constructor() {}

  public static getInstance(): Md5CheckSum {
    return Md5CheckSum.INSTANCE;
  }

  public static getId() {
    return Md5CheckSum.ID;
  }

  getDisplayStr(): string {
    return Md5CheckSum.ID;
  }

  getValue(): string {
    return Md5CheckSum.ID;
  }

  async calcHash(
    dataStream: AsyncIterable<ArrayBuffer>
  ): Promise<string | null> {
    const hashFunc = algo.MD5.create();
    for await (let arrayBuffer of dataStream) {
      hashFunc.update(lib.WordArray.create(arrayBuffer));
    }
    const hash = hashFunc.finalize();
    return hash.toString(enc.Hex);
  }
}
