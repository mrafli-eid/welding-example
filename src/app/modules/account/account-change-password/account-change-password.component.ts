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
import { AccountService } from 'src/app/core/services/account.service';

@Component({
    selector: 'ahm-account-change-password',
    templateUrl: './account-change-password.component.html',
    styleUrls: ['./account-change-password.component.scss'],
})
export class AccountChangePasswordComponent {
    formGroup: FormGroup = new FormGroup({
        current_password: new FormControl('', [Validators.required]),
        new_password: new FormControl('', [Validators.required]),
        repeat_password: new FormControl('', [Validators.required]),
    });

    constructor(private accountService: AccountService) {}

    cancel() {
        console.log(this.formGroup.value);
        console.log('cancel');
    }

    save() {
        this.formGroup.markAllAsTouched();
        const body = this.formGroup.value;
        if (
            this.formGroup.valid &&
            body.new_password === body.repeat_password
        ) {
            this.changePassword(body);
            this.formGroup.reset();
        }
    }

    changePassword(body: any) {
        this.accountService
            .changePassword(body)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.finish();
                },
                error: () => {
                    console.log('error');
                },
            });
    }

    finish() {
        this.formGroup.reset();
    }
}
