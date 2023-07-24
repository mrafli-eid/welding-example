import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubjectMachine } from "../../../../core/models/register.model";

@Component({
    selector: 'ahm-register-subject-machine-detail',
    templateUrl: './register-machine-detail.component.html',
    styleUrls: [ './register-machine-detail.component.scss' ]
})
export class RegisterMachineDetailComponent {
    @Input() data: SubjectMachine;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
