import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


export enum LoadingEventType {
  PROGRESS,
  VISIBLE
}


export class LoadingEvent {
  constructor(public type: LoadingEventType, public value: any) {}
}


@Injectable()
export class LoadingService {

  public events: Observable<LoadingEvent>;
  public interval: number = 100;

  private _progress: number = 0;
  private _visible: boolean = false;
  private _id: any = 0;

  private eventSource: Subject<LoadingEvent>;


  public constructor() {
    this.eventSource = new Subject<LoadingEvent>();
    this.events = this.eventSource.asObservable();
  }

  public set progress(value: number) {
    if (null == value) {
      return;
    }
    if (0 < value) {
      this.visible = true;
    }
    this._progress = value;
    this.emitEvent(new LoadingEvent(LoadingEventType.PROGRESS, this._progress));
  }

  public get progress(): number {
    return this._progress;
  }

  public set visible(value: boolean) {
    if (null == value) {
      return;
    }
    this._visible = value;
    this.emitEvent(new LoadingEvent(LoadingEventType.VISIBLE, this._visible));
  }

  public get visible(): boolean {
    return this._visible;
  }

  public start(onComplete: Function = null) {
    console.log("inside start");
    this.stop();
    this.visible = true;
    this._id = setInterval(() => {
      this.progress += 1;
      if (100 === this.progress) {
        this.complete();
      }
     }, this.interval);
  }

  public stop() {
    if (this._id) {
      clearInterval(this._id);
      this._id = null;
    }
  }

  public reset() {
    this.stop();
    this.progress = 0;
  }

  public complete() {
    console.log("inside complete");
    this.progress = 100;
    this.stop();
    setTimeout(() => {
      this.visible = false;
      setTimeout(() => {
        this.progress = 0;
      }, 250);
    }, 250);
  }

  private emitEvent(event: LoadingEvent) {
    if (this.eventSource) {
      this.eventSource.next(event);
    }
  }
}
