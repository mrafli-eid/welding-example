import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MasterLine } from '../../../../core/models/master.model';

@Component({
    selector: 'ahm-master-line-detail',
    templateUrl: './master-line-detail.component.html',
    styleUrls: ['./master-line-detail.component.scss'],
})
export class MasterLineDetailComponent {
    @Input() masterData: MasterLine;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
