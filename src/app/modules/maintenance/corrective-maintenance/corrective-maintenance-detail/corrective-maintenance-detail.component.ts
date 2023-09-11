import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaintenanceCorrective } from '../../../../core/models/maintenance-corrective.model';

@Component({
    selector: 'ahm-corrective-maintenance-detail',
    templateUrl: './corrective-maintenance-detail.component.html',
    styleUrls: [ './corrective-maintenance-detail.component.scss' ]
})
export class CorrectiveMaintenanceDetailComponent {
    @Input() data: MaintenanceCorrective;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
