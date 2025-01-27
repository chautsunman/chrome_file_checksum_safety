import { algo, lib, enc } from 'crypto-js';

import { CheckSumType } from '../CheckSumType';

export class Sha256CheckSum implements CheckSumType {
  private static INSTANCE: Sha256CheckSum = new Sha256CheckSum();
  private static ID = 'SHA256';

  private constructor() {}

  public static getInstance(): Sha256CheckSum {
    return Sha256CheckSum.INSTANCE;
  }

  public static getId() {
    return Sha256CheckSum.ID;
  }

  getDisplayStr(): string {
    return Sha256CheckSum.ID;
  }

  getValue(): string {
    return Sha256CheckSum.ID;
  }

  async calcHash(
    dataStream: AsyncIterable<ArrayBuffer>
  ): Promise<string | null> {
    const hashFunc = algo.SHA256.create();
    for await (let arrayBuffer of dataStream) {
      hashFunc.update(lib.WordArray.create(arrayBuffer));
    }
    const hash = hashFunc.finalize();
    return hash.toString(enc.Hex);
  }
}
