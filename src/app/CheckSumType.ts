export interface CheckSumType {
  getValue(): string;
  getDisplayStr(): string;

  calcHash(dataStream: AsyncIterable<ArrayBuffer>): Promise<string | null>;
}
