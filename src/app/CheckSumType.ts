export interface CheckSumType {
  getValue(): string;
  getDisplayStr(): string;

  calcHash(data: ArrayBuffer): Promise<ArrayBuffer|null>;
}

export class Sha256CheckSum implements CheckSumType {
  private static INSTANCE: Sha256CheckSum = new Sha256CheckSum();
  private static ID = 'SHA256';

  private constructor() {
  }

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

  calcHash(data: ArrayBuffer): Promise<ArrayBuffer|null> {
    return window.crypto.subtle.digest('SHA-256', data);
  }
}

export class Md5CheckSum implements CheckSumType {
  private static INSTANCE: Md5CheckSum = new Md5CheckSum();
  private static ID = 'MD5';

  private constructor() {
  }

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

  calcHash(data: ArrayBuffer): Promise<ArrayBuffer|null> {
    return Promise.resolve(null);
  }
}
