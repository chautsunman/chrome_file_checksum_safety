export class AppFileUtils {
  static async *getFileStream(file: File): AsyncIterable<ArrayBuffer> {
    const fileArrayBuffer = await file.arrayBuffer();
    yield fileArrayBuffer;
  }
}
