export interface CheckSumType {
  getValue(): string;
  getDisplayStr(): string;

  createCalculator(): CheckSumCalculator;
}

export interface CheckSumCalculator {
  reset(): void;
  update(data: ArrayBuffer): void;
  calc(): string;
}
