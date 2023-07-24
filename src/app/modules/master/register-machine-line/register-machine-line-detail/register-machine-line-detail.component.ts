import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MachineLine } from "../../../../core/models/register.model";

@Component({
    selector: 'ahm-register-machine-line-detail',
    templateUrl: './register-machine-line-detail.component.html',
    styleUrls: [ './register-machine-line-detail.component.scss' ]
})
export class RegisterMachineLineDetailComponent {
    @Input() data: MachineLine;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
