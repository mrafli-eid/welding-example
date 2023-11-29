import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaintenancePreventive } from '../../../../core/models/maintenance-preventive.model';

@Component({
    selector: 'ahm-preventive-maintenance-detail',
    templateUrl: './preventive-maintenance-detail.component.html',
    styleUrls: ['./preventive-maintenance-detail.component.scss'],
})
export class PreventiveMaintenanceDetailComponent {
    @Input() data: MaintenancePreventive;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
