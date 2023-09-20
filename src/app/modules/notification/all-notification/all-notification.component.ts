import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs.model';
import { NotificationService } from '../../../core/services/notification.service';
import { take } from 'rxjs';
import { NOTIF_DUMMY } from './notification.dummy';
import { notification } from '../../../core/models/notification.model';
import { Pagination } from 'src/app/core/models/pagination.model';

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
    constructor(private notificationService: NotificationService) {}
    allNotifications:notification[] = NOTIF_DUMMY
    queryParams: Partial<Pagination> = {};
    pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };

    ngOnInit() {
        this.getAllNotif();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.getAllNotif();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.getAllNotif();
    }

    updateNotif(idNotif: string){
        this.notificationService
            .updateNotification(idNotif)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.getAllNotif()
                },
            });
    }

    getAllNotif() {
        this.queryParams = {
            ...this.queryParams,
            page_number: this.pagination.page_number,
            page_size: this.pagination.page_size,
        };
        this.notificationService.getAllNotification(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: (response) => {   
                    this.allNotifications = response.body.data
                    this.pagination = JSON.parse(response.headers.get('x-pagination'));
                },
            });
    }
}
