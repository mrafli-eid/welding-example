import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from 'src/app/core/services/notification.service';
import { take } from 'rxjs';
import { notification } from 'src/app/core/models/notification.model';
import { DUMMY_DETAIL_MACHINE_TEMPERATURE_MIRROR } from '../../modules/machine/components/detail-machine-temperature-mirror/detail-machine-temperature-mirror';
import { DUMMY_DETAIL_MACHINE_DEW_POINT } from '../../modules/machine/components/detail-machine-dew-point/detail-machine-dew-point';
import { DUMMY_DETAIL_MACHINE_RURGE_CELL } from '../../modules/machine/components/detail-machine-rurge-cell/detail-machine-rurge-cell';
import { DUMMY_DETAIL_MACHINE_SANSO_MATIC } from '../../modules/machine/components/detail-machine-sanso-matic/detail-machine-sanso-matic';
import { DUMMY_DETAIL_MACHINE_RPM_SPINDLE } from '../../modules/machine/components/detail-machine-rpm-spindle/detail-machine-rpm-spindle';
import { Router } from '@angular/router';

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
        private router: Router
    ) {}
    
    tempMiror: notification[] =
        DUMMY_DETAIL_MACHINE_TEMPERATURE_MIRROR.data_label.filter(
            (data) => data.message != null
        );
    dewPoint: notification[] = DUMMY_DETAIL_MACHINE_DEW_POINT.data.filter(
        (data) => data.message != null
    );
    rurgeCell: notification[] = DUMMY_DETAIL_MACHINE_RURGE_CELL.data.filter(
        (data) => data.message != null
    );
    sansoMantic: notification[] =
        DUMMY_DETAIL_MACHINE_SANSO_MATIC.data_label.filter(
            (data) => data.message != null
        );
    rpmSpindle: notification[] =
        DUMMY_DETAIL_MACHINE_RPM_SPINDLE.data_label.filter(
            (data) => data.message != null
        );


    ngOnInit() {
        setInterval(() => {
            this.todaysDate = new Date();
        }, 1000);
        this.getTempMirorMsg();
        this.getDewPointMsg();
        this.getRurgeCellMsg();
        this.getSansoMaticMsg();
        this.getRpmSpindleMsg();
    }

    toggle() {
        this.sidebarService.toggle();
    }

    getTempMirorMsg() {
        this.notificationService
            .getTempMirorMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.tempMiror = response.data.data_label.filter(
                        (data: notification) => data.message != null
                    );
                },
            });
    }

    getDewPointMsg() {
        this.notificationService
            .getDewPointMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.dewPoint = response.data.data.filter(
                        (data: notification) => data.message != null
                    );
                },
            });
    }

    getRurgeCellMsg() {
        this.notificationService
            .getRurgeCellMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.rurgeCell = response.data.data.filter(
                        (data: notification) => data.message != null
                    );
                },
            });
    }

    getSansoMaticMsg() {
        this.notificationService
            .getSansoMaticMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.sansoMantic = response.data.data_label.filter(
                        (data: notification) => data.message != null
                    );
                },
            });
    }

    getRpmSpindleMsg() {
        this.notificationService
            .getRpmSpindleMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.rpmSpindle = response.data.data_label.filter(
                        (data: notification) => data.message != null
                    );
                },
            });
    }

    seeAllNotification() {
        this.router.navigate(['/notification'])
    }
}
