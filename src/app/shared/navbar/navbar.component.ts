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
import { HALF_MINUTE_INTERVAL } from '../../core/consts/app.const';
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
        private machineService: MachineService,
        private router: Router,
        private elRef: ElementRef
    ) {}

    listNotif = NOTIF_DUMMY.filter((data) => data.status !== true);

    isDropdownOpen = false;

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
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

        this.temperatureMirror();
        this.dewPoint();
        this.rurgeCell();
        this.sansoMatic();
        this.rpmSpindle();
        this.servoLoad();
        this.runningHour();

        setInterval(() => {
            this.temperatureMirror()
            this.dewPoint();
            this.rurgeCell();
            this.sansoMatic();
            this.rpmSpindle();
            this.servoLoad();
            this.runningHour();
        }, HALF_MINUTE_INTERVAL);

        this.getListNotif();
    }

    temperatureMirror() {
        this.machineService.getTemperatureMirror('LASER')
        .pipe(take(1))
            .subscribe();
    }
    dewPoint() {
        this.machineService.getDewPoint('LASER')
        .pipe(take(1))
        .subscribe();
    }
    rurgeCell() {
        this.machineService.getRurgeCell('LASER')
        .pipe(take(1))
        .subscribe();
    }
    sansoMatic() {
        this.machineService.getSansoMatic('BORING')
        .pipe(take(1))
        .subscribe();
    }
    rpmSpindle() {
        this.machineService.getRpmSpindle('BORING')
        .pipe(take(1))
        .subscribe();
    }
    servoLoad() {
        ROBOT_PARAMS.map((item) => {
            this.machineService.getServoLoad(
                item.machine_name,
                item.robot_name
            )
            .pipe(take(1))
            .subscribe();
        });
    }
    runningHour() {
        ROBOT_PARAMS.map((item) => {
            this.machineService.getRunningHour(
                item.machine_name,
                item.robot_name
            )
            .pipe(take(1))
            .subscribe();
        });
    }

    toggle() {
        this.sidebarService.toggle();
    }

    notifDisablled(notifId: string) {
        this.notificationService
            .updateNotification(notifId)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.getListNotif();
                },
            });
    }

    getListNotif() {
        this.notificationService
            .getListNotification()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.listNotif = response.data.filter(
                        (data) => data.status !== true
                    );
                },
            });
    }

    seeAllNotification() {
        this.router.navigate(['/notification']);
    }
}
