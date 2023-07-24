import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MasterMachine } from '../../../../core/models/master.model';

@Component({
    selector: 'ahm-master-machine-detail',
    templateUrl: './master-machine-detail.component.html',
    styleUrls: [ './master-machine-detail.component.scss' ],
})
export class MasterMachineDetailComponent {
    @Input() masterData: MasterMachine;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
