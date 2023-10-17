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
  selector: 'ahm-account-change-password',
  templateUrl: './account-change-password.component.html',
  styleUrls: ['./account-change-password.component.scss']
})
export class AccountChangePasswordComponent {
  formGroup: FormGroup = new FormGroup({
    current_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
    repeat_password: new FormControl('', [Validators.required]),
  });

  cancel() {
    console.log(this.formGroup.value);
    console.log('cancel');
  }

  save() {
      console.log(this.formGroup.value);
      console.log('Save');
  }

  
}
