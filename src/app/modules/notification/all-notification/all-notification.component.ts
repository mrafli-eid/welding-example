import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs.model';
import { DUMMY_DETAIL_MACHINE_TEMPERATURE_MIRROR } from '../../machine/components/detail-machine-temperature-mirror/detail-machine-temperature-mirror';
import { DUMMY_DETAIL_MACHINE_DEW_POINT } from '../../machine/components/detail-machine-dew-point/detail-machine-dew-point';
import { DUMMY_DETAIL_MACHINE_RURGE_CELL } from '../../machine/components/detail-machine-rurge-cell/detail-machine-rurge-cell';
import { DUMMY_DETAIL_MACHINE_SANSO_MATIC } from '../../machine/components/detail-machine-sanso-matic/detail-machine-sanso-matic';
import { DUMMY_DETAIL_MACHINE_RPM_SPINDLE } from '../../machine/components/detail-machine-rpm-spindle/detail-machine-rpm-spindle';
import {
    DetailMachineTemperatureMirror,
    DetailMachineDewPoint,
    DetailMachineRurgeCell,
    DetailMachineSansoMatic,
    DetailMachineRpmSpindle,
} from '../../../core/models/machine.model';
import {NotificationService} from "../../../core/services/notification.service"
import { take } from 'rxjs';



@Component({
    selector: 'app-all-notification',
    templateUrl: './all-notification.component.html',
    styleUrls: ['./all-notification.component.scss'],
})
export class AllNotificationComponent implements OnInit {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Notification', link: '/notification' },
    ];
    constructor(private notificationService:NotificationService) {}

    tempMiror: DetailMachineTemperatureMirror =
        DUMMY_DETAIL_MACHINE_TEMPERATURE_MIRROR;
    dewPoint: DetailMachineDewPoint = DUMMY_DETAIL_MACHINE_DEW_POINT;
    rurgeCell: DetailMachineRurgeCell = DUMMY_DETAIL_MACHINE_RURGE_CELL;
    sansoMantic: DetailMachineSansoMatic = DUMMY_DETAIL_MACHINE_SANSO_MATIC;
    rpmSpindle: DetailMachineRpmSpindle = DUMMY_DETAIL_MACHINE_RPM_SPINDLE;

    dataTableNotification = [];
    ngOnInit() {
        this.getTempMirorMsg();
        this.getDewPointMsg();
        this.getRurgeCellMsg();
        this.getSansoMaticMsg();
        this.getRpmSpindleMsg();
             
        this.tempMiror.data_label.forEach((item) => {
            item.machine_name = this.tempMiror.machine_name;
        });
        this.dewPoint.data.forEach((item) => {
            item.machine_name = this.tempMiror.machine_name;
        });
        this.rurgeCell.data.forEach((item) => {
            item.machine_name = this.rurgeCell.machine_name;
        });
        this.sansoMantic.data_label.forEach((item) => {
            item.machine_name = this.sansoMantic.machine_name;
        });
        this.rpmSpindle.data_label.forEach((item) => {
            item.machine_name = this.rpmSpindle.machine_name;
        });

        const allData = [
            ...this.tempMiror.data_label,
            ...this.dewPoint.data,
            ...this.rurgeCell.data,
            ...this.sansoMantic.data_label,
            ...this.rpmSpindle.data_label,
        ];

        this.dataTableNotification = allData.filter(
            (data) => data.message !== null
        );

        console.log(this.dataTableNotification);
    }

    getTempMirorMsg() {
        this.notificationService
            .getTempMirorMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.tempMiror = response.data
                },
            });
    }

    getDewPointMsg() {
        this.notificationService
            .getDewPointMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.dewPoint = response.data
                },
            });
    }

    getRurgeCellMsg() {
        this.notificationService
            .getRurgeCellMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.rurgeCell = response.data
                },
            });
    }

    getSansoMaticMsg() {
        this.notificationService
            .getSansoMaticMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.sansoMantic = response.data
                },
            });
    }

    getRpmSpindleMsg() {
        this.notificationService
            .getRpmSpindleMsg()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.rpmSpindle = response.data
                },
            });
    }

}
