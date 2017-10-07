import {
  Component, Input, OnInit,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {
  LoadingService, LoadingEvent, LoadingEventType
} from './loading.service';


@Component({
  selector: 'cb-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading.component.html',
  styleUrls: [
    './loading.component.css'
  ]
})
export class LoadingComponent implements OnInit {

  public progress: number = 0;

  @Input()
  public show: boolean = false;

  @Input()
  public loadingImageUrl: string = '@images/laoding.gif';

  constructor(public service: LoadingService, public cdr: ChangeDetectorRef) { }

  public get opacity() {
    return this.progress % 2;
  }

  public ngOnInit(): void {
    this.service.events.subscribe((event: LoadingEvent) => {
      switch (event.type) {
        case LoadingEventType.PROGRESS:
          if (null != event.value) {
            this.progress = event.value;
          }
          break;
        case LoadingEventType.VISIBLE:
          this.show = event.value;
          break;
        default:
          break;
      }
      this.cdr.markForCheck();
    });
  }

}
