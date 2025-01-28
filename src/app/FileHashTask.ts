import { CheckSumType } from './CheckSumType';
import { AbstractTask } from './AbstractTask';
import { EventEmitter } from 'events';
import { AppFileUtils } from './utils/AppFileUtils';

export class FileHashTask extends AbstractTask {
  private static readonly MAX_FILE_SIZE = 1024 * 1024;
  private static readonly DEFAULT_CHUNK_SIZE = 1024;

  private readonly file: File;
  private readonly checkSumType: CheckSumType;
  private readonly checkSumText: string;

  private progress: number;

  constructor(
    eventEmitter: EventEmitter,
    file: File,
    checkSumType: CheckSumType,
    checkSumText: string,
  ) {
    super(eventEmitter, 'FileHashTask');
    this.file = file;
    this.checkSumType = checkSumType;
    this.checkSumText = checkSumText;
    this.progress = 0;
  }

  start(): void {
    super.start();

    if (this.checkSumText === null || this.checkSumText.trim() === '') {
      console.log('invalid check sum');
      this.emitGeneralMsg('Invalid check sum');
      return;
    }
    if (!this.file.size) {
      console.log('invalid file size', this.file);
      this.emitGeneralMsg('Invalid file size');
      return;
    }
    if (this.file.size > FileHashTask.MAX_FILE_SIZE) {
      console.log('file too large', this.file.size, this.file);
      this.emitGeneralMsg(`File ${this.file.name} is too large, size: ${this.file.size}`);
      return;
    }

    this.calcHash();
  }

  stop(): void {
    super.stop();

    // TODO: interrupt calcHash
  }

  private async calcHash(): Promise<void> {
    const checkSumCalculator = this.checkSumType.createCalculator();
    const fileStream = AppFileUtils.getFileStream(
      this.file,
      FileHashTask.DEFAULT_CHUNK_SIZE
    );
    for await (const fileChunkPayload of fileStream) {
      checkSumCalculator.update(fileChunkPayload.chunk);
      this.progress = fileChunkPayload.chunkPercent;
      this.emit('progress', this.progress);
    }
    this.progress = 1;
    const hashStr = checkSumCalculator.calc();
    if (!hashStr) {
      this.emit('invalid-hash', null);
    }
    this.emit('complete', hashStr);
  }

  private emitGeneralMsg(msg: string): void {
    this.emit('general-msg', msg);
  }
}
