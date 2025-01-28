import { EventEmitter } from 'events';
import { Task } from './Task';

export abstract class AbstractTask implements Task {
  private readonly eventEmitter: EventEmitter;
  private readonly eventPrefix: string;

  protected constructor(eventEmitter: EventEmitter, eventPrefix: string) {
    this.eventEmitter = eventEmitter;
    this.eventPrefix = eventPrefix;
  }

  start(): void {
    console.log('task start');
  }

  stop(): void {
    console.log('task stop');
  }

  protected emit(event: string, payload: any): void {
    this.eventEmitter.emit(this.eventPrefix + '-' + event, payload);
  }
}
