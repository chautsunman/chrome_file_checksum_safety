export class AppUtils {
  static getHexFromArrayBuffer(arrayBuffer: ArrayBuffer): string {
    // snippet from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
    const hashArray = Array.from(new Uint8Array(arrayBuffer)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
  }
}
