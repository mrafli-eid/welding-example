import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/pagination/pagination.component';
import { Schedule } from '../../../../../core/models/schedule.model';

@Component({
    selector: 'ahm-maintenance-calendar-schedule',
    templateUrl: './maintenance-calendar-schedule.component.html',
    styleUrls: ['./maintenance-calendar-schedule.component.scss'],
    standalone: true,
    imports: [CommonModule, PaginationComponent],
})
export class MaintenanceCalendarScheduleComponent {
    @Input() scheduleList: Schedule[] = [];
}
