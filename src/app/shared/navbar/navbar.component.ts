import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../core/services/notification.service';
import { MachineService } from '../../core/services/machine.service';
import { take } from 'rxjs';
import { notification } from 'src/app/core/models/notification.model';
import { NOTIF_DUMMY } from '../../modules/notification/all-notification/notification.dummy';
import { Router } from '@angular/router';
import {
    HALF_MINUTE_INTERVAL,
    TEN_MINUTE_INTERVAL,
    TEN_SECOND_INTERVAL,
} from '../../core/consts/app.const';
import { ROBOT_PARAMS } from './robot-params';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatMenuModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    todaysDate = new Date();
    constructor(
        private sidebarService: SidebarService,
        private notificationService: NotificationService,
        private router: Router,
        private elRef: ElementRef
    ) {}

    listNotif: notification[] = NOTIF_DUMMY.filter(
        data => data.status !== true
    );
    params = {
        start: null,
        end: null,
        type: 'default',
    };

    isDropdownOpen = false;

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
        if (this.isDropdownOpen == true) {
            this.getListNotif();
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.isDropdownOpen = false;
        }
    }

    ngOnInit() {
        setInterval(() => {
            this.todaysDate = new Date();
        }, 1000);
        this.getListNotif();
    }

    toggle() {
        this.sidebarService.toggle();
    }

    notifDisablled(notifId: string) {
        this.notificationService
            .updateNotification(notifId)
            .pipe(take(1))
            .subscribe(() => {
                this.getListNotif();
            });
    }

    getListNotif() {
        this.notificationService
            .getListNotification()
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.listNotif = response.data.filter(
                        (data: notification) => data.status !== true
                    );
                },
            });
    }

    seeAllNotification() {
        this.router.navigate(['/notification']);
    }
}
