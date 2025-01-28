import { algo, lib, enc } from 'crypto-js';

import { CheckSumCalculator, CheckSumType } from '../CheckSumType';

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

  createCalculator(): CheckSumCalculator {
    return new Sha256CheckSumCalculator();
  }
}

export class Sha256CheckSumCalculator implements CheckSumCalculator {
  private hashFunc: any;

  constructor() {
    this.hashFunc = algo.SHA256.create();
  }

  reset(): void {
    this.hashFunc = algo.SHA256.create();
  }

  update(data: ArrayBuffer): void {
    this.hashFunc.update(lib.WordArray.create(data));
  }

  calc(): string {
    const hash = this.hashFunc.finalize();
    return hash.toString(enc.Hex);
  }
}
