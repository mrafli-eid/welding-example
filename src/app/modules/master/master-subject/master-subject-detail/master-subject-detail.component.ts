import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MasterSubject } from '../../../../core/models/master.model';

@Component({
    selector: 'ahm-master-subject-detail',
    templateUrl: './master-subject-detail.component.html',
    styleUrls: ['./master-subject-detail.component.scss'],
})
export class MasterSubjectDetailComponent {
    @Input() masterData: MasterSubject;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
