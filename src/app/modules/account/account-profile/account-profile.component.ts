import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ahm-account-profile',
    templateUrl: './account-profile.component.html',
    styleUrls: ['./account-profile.component.scss'],
})
export class AccountProfileComponent {
    formGroup: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
    });

    ngOnChanges() {}

    // <input type="file" (change)="onFileSelected($event)">
    onFileSelected(event) {
        console.log(event);
    }

    cancel() {
        console.log(this.formGroup.value);
        console.log('cancel');
    }

    save() {
        console.log(this.formGroup.value);
        console.log('Save');
    }
}
