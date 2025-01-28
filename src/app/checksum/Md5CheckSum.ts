import { algo, lib, enc } from 'crypto-js';

import { CheckSumCalculator, CheckSumType } from '../CheckSumType';

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

  createCalculator(): CheckSumCalculator {
    return new Md5CheckSumCalculator();
  }
}

export class Md5CheckSumCalculator implements CheckSumCalculator {
  private hashFunc: any;

  constructor() {
    this.hashFunc = algo.MD5.create();
  }

  reset(): void {
    this.hashFunc = algo.MD5.create();
  }

  update(data: ArrayBuffer): void {
    this.hashFunc.update(lib.WordArray.create(data));
  }

  calc(): string {
    const hash = this.hashFunc.finalize();
    return hash.toString(enc.Hex);
  }
}
