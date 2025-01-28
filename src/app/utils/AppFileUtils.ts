export class AppFileUtils {
  static DEFAULT_CHUNK_SIZE = 1024 * 1024;

  static async *getFileStream(file: File, chunkSize: number = AppFileUtils.DEFAULT_CHUNK_SIZE): AsyncIterable<ArrayBuffer> {
    let offset = 0;
    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      const arrayBuffer = await chunk.arrayBuffer();
      yield arrayBuffer;
      offset += chunkSize;
    }
  }
}
