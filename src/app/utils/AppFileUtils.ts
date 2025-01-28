export class AppFileUtils {
  private static readonly DEFAULT_CHUNK_SIZE = 1024 * 1024;

  static async *getFileStream(
    file: File,
    chunkSize: number = AppFileUtils.DEFAULT_CHUNK_SIZE
  ): AsyncIterable<FileChunkPayload> {
    let offset = 0;
    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      const arrayBuffer = await chunk.arrayBuffer();
      yield new FileChunkPayload(arrayBuffer, offset / file.size);
      offset += chunkSize;
    }
  }
}

export class FileChunkPayload {
  chunk: ArrayBuffer;
  chunkPercent: number;

  constructor(chunk: ArrayBuffer, chunkPercent: number) {
    this.chunk = chunk;
    this.chunkPercent = chunkPercent;
  }
}
