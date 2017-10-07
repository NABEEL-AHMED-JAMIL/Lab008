import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LayoutService {
    private preloaderStateSource = new Subject<string>();

    preloaderState$ = this.preloaderStateSource.asObservable();

    updatePreloaderState(state: string) {
        // console.log('preloader state: ' + state)
        this.preloaderStateSource.next(state);
    }

    private searchOverlaySource = new Subject<string>();

    searchOverlayState$ = this.searchOverlaySource.asObservable();

    updateSearchOverlayState(state: string) {
        // console.log('overlay state: ' + state)
        this.searchOverlaySource.next(state);
    }
}
