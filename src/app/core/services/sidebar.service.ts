import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    isSidebarOpened$ = new BehaviorSubject<boolean>(true);


    constructor() {
    }

    toggle() {
        this.isSidebarOpened$.next(!this.isSidebarOpened$.value);
    }
}
